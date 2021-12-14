import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '@services/api';

import { useAuth } from '@hooks/auth';
import { useToast } from '@hooks/toast';

import Button from '@components/Button';
import Input from '@components/Input';

import getValidationErrors from '@utils/getValidationErrors';

import { Container, AnimationContainer, Content, Avatar } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Preencha seu nome!'),
          email: Yup.string()
            .required('Preencha seu e-mail!')
            .email('Preencha um e-mail válido!'),
          oldPassword: Yup.string(),
          password: Yup.string().when('oldPassword', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Preencha sua nova senha'),
            otherwise: Yup.string()
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Confirme sua nova senha'),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password')], 'Senhas não conferem')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        const {
          name,
          email,
          oldPassword,
          password,
          passwordConfirmation
        } = data;

        const formData = {
          name,
          email,
          ...(oldPassword
            ? {
                oldPassword,
                password,
                passwordConfirmation
              }
            : {})
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description: 'Suas informações foram atualizadas com sucesso!'
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao atualizar',
          description:
            'Ocorreu um erro ao atualizar seu perfil, tente novamente!'
        });
      }
    },
    [addToast, history, updateUser]
  );

  const handleAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api
          .patch('/users', data)
          .then(response => {
            updateUser(response.data);

            addToast({
              type: 'success',
              title: 'Avatar atualizado!'
            });
          })
          .catch(() => {
            addToast({
              type: 'error',
              title: 'Erro ao atualizar o avatar!'
            });
          });
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft size={30} />
          </Link>
        </div>
      </header>

      <Content>
        <AnimationContainer>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{
              name: user.name,
              email: user.email
            }}
          >
            <Avatar>
              {user.avatarUrl ? (
                <img
                  src={
                    user.avatarUrl?.includes('pravatar')
                      ? user.avatar
                      : user.avatarUrl
                  }
                  alt={user.name}
                />
              ) : (
                <FiUser size={30} />
              )}
              <label htmlFor="avatar">
                <FiCamera size={20} />
                <input type="file" id="avatar" onChange={handleAvatar} />
              </label>
            </Avatar>

            <h1>Meu perfil</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              autoComplete="off"
            />

            <br />

            <Input
              name="oldPassword"
              icon={FiLock}
              type="password"
              placeholder="Senha atual"
              autoComplete="off"
            />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
              autoComplete="off"
            />

            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar nova senha"
              autoComplete="off"
            />

            <Button type="submit">Confirmar mudança</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
