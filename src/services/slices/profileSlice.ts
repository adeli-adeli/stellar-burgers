import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from 'src/utils/cookie';

interface InitialState {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: null
};

//Регистрация пользователя
export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'profile/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      localStorage.setItem('token', response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//Получение данных пользователя
export const profileUser = createAsyncThunk<TUserResponse>(
  'profile/profileUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//Авторизация пользователя
export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'profile/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('token', response.accessToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//Регистрация пользователя
export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error?.message ||
          'Ошибка регистрации';
      });
  }
});

export const {} = registerSlice.actions;
export const registerReducer = registerSlice.reducer;

//Авторизация пользователя
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.error = null;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) ||
          action.error?.message ||
          'Ошибка авторизации';
      });
  }
});

export const { logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
