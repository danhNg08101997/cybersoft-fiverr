import type {DSCongViecTheoTen, InitState, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";

const initialState: InitState<DSCongViecTheoTen[]> = {
    loading: false,
    data: null,
    error: null,
}

export const layCongViecChiTietService = createAsyncThunk(
    "searchJob/layCongViecChiTietService",
    async (maCongViec:string, thunkAPI) => {
        try{
            const maCongViecNo = Number(encodeURIComponent(maCongViec.trim()));

            const response = await apiConfig.get<TApiResponse<DSCongViecTheoTen[]>>(`cong-viec/lay-cong-viec-chi-tiet/${maCongViecNo}`);

            return response.data.content ?? response.data;
        }catch (error){
            return thunkAPI.rejectWithValue( error || "Không thể tải chi tiết công việc" );
        }
    }
)

const layCongViecChiTietSlice = createSlice({
    name: "layCongViecChiTiet",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(layCongViecChiTietService.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(layCongViecChiTietService.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload as DSCongViecTheoTen[];
        })
        builder.addCase(layCongViecChiTietService.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload as AxiosError<never>
        })
    }
})

export default layCongViecChiTietSlice.reducer;