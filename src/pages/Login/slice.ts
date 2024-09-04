import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {loginUser, logoutUser} from '../../services/api';
import {LoginCredentials} from '../../types';

interface LoginState {
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  accessToken: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk('login/loginUser', async (credentials: LoginCredentials, {rejectWithValue}) => {
  try {
    const response = await loginUser(credentials);
    return response.accessToken;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
  }
});

export const logout = createAsyncThunk('login/logoutUser', async (_, {getState, rejectWithValue}) => {
  const {login} = getState() as {login: LoginState};
  try {
    await logoutUser(login.accessToken);
    return null;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.accessToken = null;
        state.error = action.payload as string;
      });
  },
});

export default loginSlice.reducer;
