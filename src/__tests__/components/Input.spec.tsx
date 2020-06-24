import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on an input', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerComponent = getByTestId('input-container');

    fireEvent.focus(inputElement);
    await wait(() => {
      expect(containerComponent).toHaveStyle('border-color: #ff9000');
      expect(containerComponent).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElement);
    await wait(() => {
      expect(containerComponent).not.toHaveStyle('border-color: #ff9000');
      expect(containerComponent).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should keep highlight on an input when has value', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerComponent = getByTestId('input-container');

    fireEvent.change(inputElement, { target: { value: 'valor' } });

    fireEvent.blur(inputElement);
    await wait(() => {
      expect(containerComponent).toHaveStyle('color: #ff9000');
    });
  });
});
