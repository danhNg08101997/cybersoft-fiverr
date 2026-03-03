import type {InitState, TApiResponse, User} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";


const initialState: InitState<User> = {
    loading: false,
    data: null,
    error: null,
}

export const registerService = createAsyncThunk(
    "auth/registerService",
    async (user, {rejectWithValue}) => {
        try {
            const response = await apiConfig.post<TApiResponse<User>>("auth/signup", user)
            return response.data.content
        }catch(error) {
            return rejectWithValue(error);
        }
    }
)

const registerSlice = createSlice({
    name:"register",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerService.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(registerService.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload as User;
        })
        builder.addCase(registerService.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload as AxiosError<never>
        })
    }
})

export default registerSlice.reducer;