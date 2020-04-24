import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErros from '../../utils/getValidationErros';

import logo from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Background, Content } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Tamanho mínimo de 6 digitos'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const validations = getValidationErros(err);
      formRef.current?.setErrors(validations);
    }
  }, []);
  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt="GoWeb" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="new">
          <FiArrowLeft />
          Voltar para o login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
