import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  userRequest: boolean;
  userFailed: boolean;
  updateUserRequest: boolean;
  updateUserError: string | null;
};

const initialState: TUserState = {
  user: null,
  userRequest: false,
  userFailed: false,
  updateUserRequest: false,
  updateUserError: null
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (form: TLoginData) => {
    const data = await loginUserApi(form);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (form: TRegisterData) => {
    const data = await registerUserApi(form);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (form: Partial<TRegisterData>) => {
    const data = await updateUserApi(form);
    return data.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.userRequest = true;
        state.userFailed = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userRequest = false;
        state.userFailed = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.userRequest = false;
        state.userFailed = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.userRequest = true;
        state.userFailed = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userRequest = false;
        state.userFailed = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.userRequest = false;
        state.userFailed = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserRequest = true;
        state.updateUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.updateUserRequest = false;
        state.updateUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserRequest = false;
        state.updateUserError = action.error.message || null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const userReducer = userSlice.reducer;
