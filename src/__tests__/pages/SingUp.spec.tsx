import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignUp from '../../pages/SignUp';

const mockedHistory = jest.fn();
const mockedSignUp = jest.fn();

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
      signUp: mockedSignUp,
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

describe.skip('SignUp', () => {
  beforeEach(() => {
    mockedHistory.mockClear();
  });
  it('should be able to SignUp', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);
    const nameComponent = getByPlaceholderText('Nome');
    const emailComponent = getByPlaceholderText('E-mail');
    const passwordComponent = getByPlaceholderText('Senha');
    const button = getByText('Cadastrar');

    fireEvent.change(nameComponent, { target: { value: 'jeison azevedo' } });
    fireEvent.change(emailComponent, { target: { value: 'jeison@gmail.com' } });
    fireEvent.change(passwordComponent, { target: { value: '123456' } });

    fireEvent.click(button);

    await wait(() => {
      expect(mockedHistory).toBeCalledWith('/dashboard');
    });
  });

  it('should not be able to SignUp', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);
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
    mockedSignUp.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignUp />);
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
