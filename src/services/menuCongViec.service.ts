import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiConfig } from "@services/apiConfig.ts";
import type { AppError, InitState, MenuCongViec, TApiResponse } from "@types";
import { normalizeApiError } from "@utils/normalizeApiError";

const initialState: InitState<MenuCongViec[]> = {
    loading: false,
    data: null,
    error: null,
}

export const menuCongViecService = createAsyncThunk<
  MenuCongViec[],
  void,
  { rejectValue: AppError }
>(
    "menu/menuCongViec",
    async (__, {rejectWithValue}) => {
        try {
            const response = await apiConfig.get<TApiResponse<MenuCongViec[]>>("cong-viec/lay-menu-loai-cong-viec");
            return response.data.content ?? [];
        }catch (error){
            return rejectWithValue(normalizeApiError(error));
        }
    }
)

const menuCongViecSlice = createSlice({
    name: "menuCongViec",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(menuCongViecService.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(menuCongViecService.fulfilled,(state, action)=>{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(menuCongViecService.rejected, (state, action)=>{
            state.loading = false;
            state.error =
            action.payload ?? { message: 'Không thể tải menu công việc.' };
        })
    }
})

export default menuCongViecSlice.reducer;