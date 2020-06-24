import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const mockApi = new MockAdapter(api);
describe('Auth hooks', () => {
  it('should be able to signin', async () => {
    const apiResponse = {
      user: {
        id: 'id-123',
        name: 'jeison',
        email: 'jeison@gmail.com',
      },
      token: 'token-123',
    };
    mockApi.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'jeison@gmail.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GOBARBER:token',
      apiResponse.token
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GOBARBER:user',
      JSON.stringify(apiResponse.user)
    );
    expect(result.current.user.email).toBe('jeison@gmail.com');
  });

  it('should restore saved data from storage whenauth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GOBARBER:token':
          return 'user-123';
        case '@GOBARBER:user':
          return JSON.stringify({
            id: 'id-123',
            name: 'jeison',
            email: 'jeison@gmail.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('jeison@gmail.com');
  });

  it('should signout', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GOBARBER:token':
          return 'user-123';
        case '@GOBARBER:user':
          return JSON.stringify({
            id: 'id-123',
            name: 'jeison',
            email: 'jeison@gmail.com',
          });
        default:
          return null;
      }
    });
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'id-123',
      name: 'jeison',
      email: 'jeison@gmail.com',
      avatar_url: 'image.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GOBARBER:user',
      JSON.stringify(user)
    );
    expect(result.current.user).toEqual(user);
  });
});
