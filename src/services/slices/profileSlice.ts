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
      localStorage.setItem('refreshToken', response.refreshToken);
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
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
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
        localStorage.setItem('refreshToken', action.payload.refreshToken);
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
    logoutUser: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
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
        localStorage.setItem('refreshToken', action.payload.refreshToken);
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

//Обновление данных пользователя
export const createUserSlice = createSlice({
  name: 'createUser',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = state.user
        ? { ...state.user, ...action.payload.user }
        : action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder
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

export const { createUser } = createUserSlice.actions;
export const createUserReducer = createUserSlice.reducer;
