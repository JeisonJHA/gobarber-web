import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';

import { Container, Background, Content, AnimationContainer } from './styles';
import getValidationErros from '../../utils/getValidationErros';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Informe a senha'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta'
          ),
        });

        await schema.validate(data, { abortEarly: false });
        const { password, password_confirmation } = data;

        const [, token] = location.search.split('=');
        if (!token) {
          throw new Error();
        }
        await api.post('', {
          token,
          password,
          password_confirmation,
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validations = getValidationErros(err);
          formRef.current?.setErrors(validations);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description: 'Verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, history, location.search]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoWeb" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirme a Senha"
            />
            <Button type="submit">Recuperar</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
