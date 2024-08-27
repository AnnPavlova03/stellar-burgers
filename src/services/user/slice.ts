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
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});
export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setAuth, setUser } = userSlice.actions;
