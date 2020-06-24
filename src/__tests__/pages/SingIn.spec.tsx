import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistory = jest.fn();
const mockedSignIn = jest.fn();

const mockedToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistory,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedToast,
    }),
  };
});

describe('SignIn', () => {
  beforeEach(() => {
    mockedHistory.mockClear();
  });
  it('should be able to SignIn', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailComponent = getByPlaceholderText('E-mail');
    const passwordComponent = getByPlaceholderText('Senha');
    const button = getByText('Login');

    fireEvent.change(emailComponent, { target: { value: 'jeison@gmail.com' } });
    fireEvent.change(passwordComponent, { target: { value: '123456' } });

    fireEvent.click(button);

    await wait(() => {
      expect(mockedHistory).toBeCalledWith('/dashboard');
    });
  });

  it('should not be able to SignIn', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailComponent = getByPlaceholderText('E-mail');
    const passwordComponent = getByPlaceholderText('Senha');
    const button = getByText('Login');

    fireEvent.change(emailComponent, { target: { value: 'invalid_email' } });
    fireEvent.change(passwordComponent, { target: { value: '123456' } });

    fireEvent.click(button);

    await wait(() => {
      expect(mockedHistory).not.toBeCalled();
    });
  });

  it('should shows an error', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailComponent = getByPlaceholderText('E-mail');
    const passwordComponent = getByPlaceholderText('Senha');
    const button = getByText('Login');

    fireEvent.change(emailComponent, { target: { value: 'jeison@gmail.com' } });
    fireEvent.change(passwordComponent, { target: { value: '123456' } });

    fireEvent.click(button);

    await wait(() => {
      expect(mockedToast).toBeCalled();
    });
  });
});
