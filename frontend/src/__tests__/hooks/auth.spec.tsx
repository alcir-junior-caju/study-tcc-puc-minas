import { act, renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from '@services/api';

import { AuthProvider, useAuth } from '@hooks/auth';

const apiMock = new MockAdapter(api.system);

describe('Auth hook', () => {
  it('Should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'userid',
        name: 'John Doe',
        email: 'johndoe@example.com.br'
      },
      token: 'token'
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456'
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:token',
      apiResponse.token
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user)
    );
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('Should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token';

        case '@GoBarber:user':
          return JSON.stringify({
            id: 'userid',
            name: 'John Doe',
            email: 'johndoe@example.com.br'
          });

        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('Should be able to sign out', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token';

        case '@GoBarber:user':
          return JSON.stringify({
            id: 'userid',
            name: 'John Doe',
            email: 'johndoe@example.com.br'
          });

        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('Should be able to update user data', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    const user = {
      id: 'userid',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatarUrl: 'avatar'
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user)
    );

    expect(result.current.user).toEqual(user);
  });
});
