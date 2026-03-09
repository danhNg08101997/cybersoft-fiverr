import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {AppError, InitState, LoginPayload, LoginResponse, TApiResponse} from "@types";
import {apiConfig} from "./apiConfig.ts";
import {normalizeApiError} from "../utils/normalizeApiError.ts";

const rawUser = localStorage.getItem("USER_LOGIN");
const persistedData: LoginResponse | null = rawUser ? JSON.parse(rawUser) : null;

const initialState: InitState<LoginResponse> = {
    loading: false,
    data: persistedData,
    error: null,
}

export const loginService = createAsyncThunk<
    LoginResponse,
    LoginPayload,
    { rejectValue: AppError  }
>(
    "auth/loginService",
    async (user, { rejectWithValue }) => {
try {
    const response = await apiConfig.post<TApiResponse<LoginResponse>>("auth/signin", user);

    const loginData = response.data?.content;

    if (!loginData) {
        return rejectWithValue({
            message: "Không nhận được dữ liệu đăng nhập",
        });
    }
    localStorage.setItem("USER_LOGIN", JSON.stringify(loginData));

    return loginData;
}catch (error){
    return rejectWithValue(normalizeApiError(error));
}
    }
)

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        logout: (state) => {
            state.data = null;
            state.error = null;
            state.loading = false;
            localStorage.removeItem("USER_LOGIN");
        },
        resetLoginState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers:(builder) =>{
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
    }
})

export const { logout, resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;