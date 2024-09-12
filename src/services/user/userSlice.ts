import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUser, logoutUser, registerUser, updateUser } from './actions';

interface IUserState {
  isAuthChecked: boolean;
  user: TUser | null;
  status: boolean;
  error: null | string;
}
export const initialStateUser: IUserState = {
  isAuthChecked: false,
  user: null,
  status: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser,
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
      .addCase(loginUser.pending, (state) => {
        state.status = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message ?? 'error message loginUser';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message ?? 'error message registerUser';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message ?? 'error message registerUser';
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message ?? 'error message logoutUser';
      });
  }
});
export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setAuth, setUser } = userSlice.actions;
