import type {BinhLuan, InitState, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";

const initialState: InitState<BinhLuan[]> = {
    loading: false,
    data: null,
    error: null
}

export const layBinhLuanTheoCongViecService = createAsyncThunk(
    "searchJob/layBinhLuanTheoCongViec",
    async (maCongViec: string, thunkAPI) => {
        try {
            const maCongViecNumber = Number(encodeURIComponent(maCongViec.trim()));

            const response = await apiConfig.get<TApiResponse<BinhLuan[]>>(`binh-luan/lay-binh-luan-theo-cong-viec/${maCongViecNumber}`);

            return response.data.content ?? response.data;

        }catch (error) {
            return thunkAPI.rejectWithValue( error || "Không thể tải danh sách bình luận công việc" );
        }
    }
)

const layBinhLuanTheoCongViecSlice = createSlice({
    name: "layBinhLuanTheoCongViec",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase( layBinhLuanTheoCongViecService.pending, (state) => {
            state.loading = true;
        } )

        builder.addCase( layBinhLuanTheoCongViecService.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload as BinhLuan[]
        } )

        builder.addCase(layBinhLuanTheoCongViecService.rejected, (state, action) =>{
            state.loading = false
            state.error = action.payload as AxiosError<never>
        })
    }
})

export default layBinhLuanTheoCongViecSlice.reducer;