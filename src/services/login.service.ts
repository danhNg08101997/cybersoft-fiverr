import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {InitState, TApiResponse, User} from "@types";
import {apiConfig} from "./apiConfig.ts";
import type {AxiosError} from "axios";

const token = localStorage.getItem("USER_LOGIN") ?? ''

const data = token ? JSON.parse(token) : null;

const initialState: InitState<TApiResponse<object>> = {
    loading: false,
    data,
    error: null,
}

export const loginService = createAsyncThunk(
    "loginService",
    async (user, {rejectWithValue}) => {
try {
    const response = await apiConfig.post<TApiResponse<User>>("auth/signin", user);

    const userInfoString = JSON.stringify(response.data.content)
    localStorage.setItem("USER_LOGIN", userInfoString);

    return response.data.content;
}catch (error){
    return rejectWithValue(error);
}
    }
)

const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(loginService.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginService.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(loginService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError<never>
        });
    }
})

export default loginSlice.reducer;