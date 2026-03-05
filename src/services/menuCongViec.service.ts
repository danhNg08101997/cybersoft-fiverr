import type {InitState, MenuCongViec, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";

const initialState: InitState<MenuCongViec[]> = {
    loading: false,
    data: null,
    error: null,
}

export const menuCongViecService = createAsyncThunk(
    "menu/menuCongViec",
    async (__, {rejectWithValue}) => {
        try {
            const response = await apiConfig.get<TApiResponse<MenuCongViec[]>>("cong-viec/lay-menu-loai-cong-viec");
            console.log("🚀 ~  ~ response: ", response);
            return response.data.content;
        }catch (error){
            return rejectWithValue(error);
        }
    }
)

const menuCongViecSlice = createSlice({
    name: "menuCongViec",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(menuCongViecService.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(menuCongViecService.fulfilled,(state, action)=>{
            state.loading = false;
            state.data = action.payload as MenuCongViec[]
        })
        builder.addCase(menuCongViecService.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload as AxiosError<never>
        })
    }
})

export default menuCongViecSlice.reducer;