import type {AppError, BinhLuan, BinhLuanRequst, InitState, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {normalizeApiError} from "../utils/normalizeApiError.ts";
import {apiConfig} from "@services/apiConfig.ts";

const initialState: InitState<BinhLuan> = {
    loading: false,
    data: null,
    error: null,
}

export const binhLuanService = createAsyncThunk<
    BinhLuan,
    BinhLuanRequst,
    { rejectValue: AppError }
>(
    "searchJob/binhLuan",
    async (binhLuan, thunkAPI) => {
        try {
            const response = await apiConfig.post<TApiResponse<BinhLuan>>("binh-luan", binhLuan);
            if (!response.data?.content) {
                return thunkAPI.rejectWithValue({message: "Không nhận được dữ liệu đăng ký"});
            }
            return response.data.content;
        } catch (error) {
            return thunkAPI.rejectWithValue(normalizeApiError(error));
        }
    }
)

const binhLuanSlice = createSlice({
    name: "binhLuan",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(binhLuanService.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(binhLuanService.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })

        builder.addCase(binhLuanService.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload??{ message: "Thêm bình luận thất bại. Vui lòng thử lại.",}
        })
    }
})

export default binhLuanSlice.reducer;