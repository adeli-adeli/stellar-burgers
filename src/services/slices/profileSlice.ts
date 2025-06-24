import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from 'src/utils/cookie';
import { RootState } from '../store';

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
      if (response.success) {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
      return response;
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
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

//Обновление данных пользователя
export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>('profile/updateUser', async (data, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(data);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

//Авторизация пользователя
export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'profile/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      if (response.success) {
        setCookie('accessToken', response.accessToken);
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
      return response;
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
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
export const selectRegister = (state: RootState) => state.registerSlice.user;
export const isLoadingRegister = (state: RootState) =>
  state.registerSlice.isLoading;
export const errorRegister = (state: RootState) => state.registerSlice.error;
export const isAuthRegister = (state: RootState) => state.registerSlice.isAuth;

export const {} = registerSlice.actions;
export const registerReducer = registerSlice.reducer;

//Авторизация пользователя
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuth = false;
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
      })
      .addCase(profileUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const selectProfile = (state: RootState) => state.authSlice.user;
export const isLoadingProfile = (state: RootState) => state.authSlice.isLoading;
export const errorProfile = (state: RootState) => state.authSlice.error;
export const isAuthProfile = (state: RootState) => state.authSlice.isAuth;

export const { logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
