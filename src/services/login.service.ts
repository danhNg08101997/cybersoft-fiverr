import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {InitState, LoginPayload, LoginResponse, TApiResponse} from "@types";
import {apiConfig} from "./apiConfig.ts";
import type {AxiosError} from "axios";

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
    { rejectValue: AxiosError<never> }
>(
    "auth/loginService",
    async (user, { rejectWithValue }) => {
try {
    const response = await apiConfig.post<TApiResponse<LoginResponse>>("auth/signin", user);

    const loginData = response.data?.content;

    if (!loginData) {
        throw new Error("Không nhận được dữ liệu đăng nhập");
    }
    localStorage.setItem("USER_LOGIN", JSON.stringify(loginData));

    return loginData;
}catch (error){
    return rejectWithValue(error as AxiosError<never>);
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
    },
    extraReducers:(builder) =>{
        builder.addCase(loginService.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginService.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(loginService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? null;
        });
    }
})

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;