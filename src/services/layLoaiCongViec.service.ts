import type {InitState, MenuCongViec, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";

const initialState: InitState<MenuCongViec[]> ={
    loading: false,
    data: null,
    error: null,
}

export const layLoaiCongViecService = createAsyncThunk(
    "searchJob/layLoaiCongViecService",
    async (maLoaiCongViec:string,thunkAPI) => {
        try {
            const maLoaiCongViecNo = Number(encodeURIComponent(maLoaiCongViec.trim()));

            const response = await apiConfig.get<TApiResponse<MenuCongViec[]>>(`cong-viec/lay-chi-tiet-loai-cong-viec/${maLoaiCongViecNo}`)

            return response.data.content ?? response.data;
        }catch (error){
            return thunkAPI.rejectWithValue( error || "Không thể tải danh sách loại công việc" );
        }
    }
)

const layLoaiCongViecSlice = createSlice({
    name: "layLoaiCongViec",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(layLoaiCongViecService.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })

        builder.addCase(layLoaiCongViecService.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as MenuCongViec[];
            state.error = null;
        })

        builder.addCase(layLoaiCongViecService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as AxiosError
        })
    }
})

export default layLoaiCongViecSlice.reducer;