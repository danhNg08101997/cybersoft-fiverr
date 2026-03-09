import type {InitState, MenuCongViec, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";

const initialState: InitState<MenuCongViec[]> = {
    loading: false,
    data: null,
    error: null,
}

export const layChiTietLoaiCongViecService = createAsyncThunk(
    "searchJob/layChiTietLoaiCongViecService",
    async (maLoaiCongViec:string, thunkAPI)=>{
        try{
            const maLoaiCongViecNumber = Number(encodeURIComponent(maLoaiCongViec.trim()));

            const response = await apiConfig.get<TApiResponse<MenuCongViec[]>>(`cong-viec/lay-chi-tiet-loai-cong-viec/${maLoaiCongViecNumber}`);

            return response.data.content ?? response.data;
        }catch (error){
            return thunkAPI.rejectWithValue( error || "Không thể tải danh sách công việc" );
        }
    }
)

const layChiTietLoaiCongViecSlice = createSlice({
    name: "layChiTietLoaiCongViec",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(layChiTietLoaiCongViecService.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(layChiTietLoaiCongViecService.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload as MenuCongViec[]
        })
        builder.addCase(layChiTietLoaiCongViecService.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload as AxiosError<never>
        })
    }
})

export default layChiTietLoaiCongViecSlice.reducer;