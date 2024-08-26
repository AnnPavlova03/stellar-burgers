import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { setAuth, setUser } from './slice';

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const user = await loginUserApi({ email, password });
    setCookie('accessToken', user.accessToken);
    localStorage.setItem('refreshToken', user.refreshToken);
    return user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('refreshToken')) {
      getUserApi()
        .then((user) => dispatch(setUser(user)))
        .finally(() => dispatch(setAuth(true)));
    } else {
      dispatch(setAuth(true));
    }
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async ({ email, password, name }: TRegisterData) => {
    const user = await registerUserApi({ email, password, name });
    return user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, password, name }: TRegisterData) => {
    const user = await updateUserApi({ email, password, name });
    return user;
  }
);
