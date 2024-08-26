import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUser, logoutUser, registerUser, updateUser } from './actions';

interface IUserState {
  isAuthChecked: boolean;
  user: TUser | null;
}
const initialState: IUserState = {
  isAuthChecked: false,
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        console.log('loginUser', state.user);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        console.log('registerUser', state.user);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        console.log('updateUser', state.user);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        console.log('logoutUser', state.user);
      });
  }
});
export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setAuth, setUser } = userSlice.actions;
