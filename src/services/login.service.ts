import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  AppError,
  InitState,
  LoginPayload,
  LoginResponse,
  TApiResponse,
} from "@types";
import { apiConfig } from "./apiConfig";
import { normalizeApiError } from "@utils/normalizeApiError";
import { clearStoredUser, getStoredUser, setStoredUser } from "@utils/storage";

const initialState: InitState<LoginResponse> = {
  loading: false,
  data: getStoredUser(),
  error: null,
};

export const loginService = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: AppError }
>("auth/login", async (user, { rejectWithValue }) => {
  try {
    const response = await apiConfig.post<TApiResponse<LoginResponse>>(
      "auth/signin",
      user,
    );

    const loginData = response.data?.content;

    if (!loginData) {
      return rejectWithValue({
        message: "Không nhận được dữ liệu đăng nhập",
      });
    }

    setStoredUser(loginData);
    return loginData;
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
      clearStoredUser();
    },
    resetLoginState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(loginService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? {
        message: "Đăng nhập thất bại. Vui lòng thử lại.",
      };
    });
  },
});

export const { logout, resetLoginState } = authSlice.actions;
export default authSlice.reducer;
