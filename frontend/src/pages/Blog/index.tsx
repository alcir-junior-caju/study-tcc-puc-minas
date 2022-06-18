import React, {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { FiXCircle, FiTrash2, FiCamera } from 'react-icons/fi';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '@services/api';

import { useAuth } from '@hooks/auth';
import { useToast } from '@hooks/toast';

import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import Loading from '@components/Loading';

import getValidationErrors from '@utils/getValidationErrors';
import truncateString from '@utils/truncateString';

import {
  Container,
  ContainerList,
  ContainerLoading,
  ContainerPost,
  Content,
  List,
  Select
} from './styles';

interface User {
  id: number;
  email: string;
}

interface Category {
  id: number;
  title: string;
}

interface RepositoryParams {
  slug: string;
}

interface SavePost {
  title: string;
  categories: number;
  content: string;
  user: number;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: {
    alternativeText: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
    url: string;
  };
  user: {
    username: string;
    email: string;
  };
}

const Blog: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user: UserLogged } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const { params } = useRouteMatch<RepositoryParams>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<number | string | undefined>(
    undefined
  );

  useEffect(() => {
    api.blog
      .get('/categories')
      .then(response => setCategories(response.data.data));

    api
      .blog(`/users?filters[email][$eq]=${UserLogged.email}`)
      .then(response => setUser(response.data[0]));

    api.blog.get(`posts?populate=image,user`).then(response => {
      const { data } = response.data;
      setPosts(data);

      if (params.slug) {
        const newPost = posts.find(p => p.slug === params.slug);
        setPost(newPost);
      }
    });
  }, [params]);

  const handleSubmit = useCallback(
    async (data: SavePost) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Preencha seu título!')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        const newData = {
          ...data,
          user: user?.id,
          categories: Number(category)
        };

        await api.blog.post('/posts', {
          data: newData
        });

        history.push('/blog');

        addToast({
          type: 'success',
          title: 'Postagem salva',
          description: 'Sua postagem foi salva com sucesso!'
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao salvar',
          description:
            'Ocorreu um erro ao salvar sua postagem, tente novamente!'
        });
      }
    },
    [addToast, history, category, user]
  );

  const handleDelete = useCallback(
    async id => {
      try {
        if (id) {
          await api.blog.delete(`posts/${id}`);

          addToast({
            type: 'success',
            title: 'Postagem deletada',
            description: 'Sua postagem foi deletada com sucesso!'
          });

          history.push('/blog');
        }
      } catch (error) {
        console.error(error);

        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description:
            'Ocorreu um erro ao deletar sua postagem, tente novamente!'
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Header />
      <h1>Blog</h1>
      <ContainerPost>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          // initialData={{
          //   name: user.name,
          //   email: user.email
          // }}
        >
          <Input name="title" placeholder="Título" />

          <Select name="categories" onChange={e => setCategory(e.target.value)}>
            <option value="">Selecione uma categoria</option>
            {Children.toArray(
              categories.map(({ id, title }: Category) => (
                <option value={id}>{title}</option>
              ))
            )}
          </Select>

          <Input name="content" placeholder="Conteúdo" />
          {/* <Photo>
            <label htmlFor="avatar">
              <FiCamera size={20} />
              <input type="file" id="avatar" />
            </label>
          </Photo>
          <br /> */}
          <Button type="submit">Salvar</Button>
        </Form>
      </ContainerPost>

      {posts ? (
        <>
          <Content>
            {Children.toArray(
              posts?.map(
                ({
                  id,
                  title,
                  slug,
                  content,
                  image,
                  user: { username, email }
                }: Post) => {
                  return (
                    <ContainerList>
                      <List to={`/blog/${slug}`}>
                        {image && (
                          <img
                            src={`https://gobarber-blog.herokuapp.com${image.formats.thumbnail.url}`}
                            alt={image.alternativeText}
                          />
                        )}
                        <h3>{title}</h3>
                        <small>{`por: ${username}`}</small>
                        <p>{truncateString(content, 150)}</p>
                      </List>
                      {UserLogged?.email === email && (
                        <div
                          onClick={() => handleDelete(id)}
                          aria-hidden="true"
                        >
                          <FiTrash2 size={20} />
                          Excluir sua postagem
                        </div>
                      )}
                    </ContainerList>
                  );
                }
              )
            )}
          </Content>
          {post && (
            <ContainerPost>
              <div>
                <FiXCircle
                  size={20}
                  onClick={() => {
                    history.push('/blog');
                    setPost(undefined);
                  }}
                />
                Fechar
              </div>
              {post?.image && (
                <img
                  src={`https://gobarber-blog.herokuapp.com${post.image.url}`}
                  alt={post.image.alternativeText}
                />
              )}
              <h2>{post.title}</h2>
              <small>{`por: ${post.user.username}`}</small>
              <p>{post.content}</p>
            </ContainerPost>
          )}
        </>
      ) : (
        <ContainerLoading>
          <Loading />
          Carregando
        </ContainerLoading>
      )}
    </Container>
  );
};

export default Blog;
