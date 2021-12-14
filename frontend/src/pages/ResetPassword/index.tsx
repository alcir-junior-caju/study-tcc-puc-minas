import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '@services/api';

import { useToast } from '@hooks/toast';

import Button from '@components/Button';
import Input from '@components/Input';

import logo from '@assets/logo.svg';

import getValidationErrors from '@utils/getValidationErrors';

import { Container, AnimationContainer, Content, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { search } = useLocation();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Preencha sua senha!'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Senhas não conferem!'
          )
        });

        await schema.validate(data, {
          abortEarly: false
        });

        const token = search.replace('?token=', '');

        if (!token) throw new Error();

        await api.post('/password/reset', {
          password: data.password,
          passwordConfirmation: data.passwordConfirmation,
          token
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
          description: 'Sua senha foi alterada corretamente.'
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha.'
        });
      }
    },
    [addToast, history, search]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
              autoComplete="current-password"
            />

            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirme a senha"
              autoComplete="current-password"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
