import React, { useRef, useCallback, useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';

import { Container, Background, Content, AnimationContainer } from './styles';
import getValidationErros from '../../utils/getValidationErros';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  // const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, { abortEarly: false });
        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validations = getValidationErros(err);
          formRef.current?.setErrors(validations);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Verifique os dados de credencial.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoWeb" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para o login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
