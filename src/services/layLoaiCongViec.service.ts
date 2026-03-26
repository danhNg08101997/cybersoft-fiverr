import type { AppError, InitState, MenuCongViec, TApiResponse } from '@types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiConfig } from '@services/apiConfig';
import { normalizeApiError } from '@utils/normalizeApiError';

const initialState: InitState<MenuCongViec[]> = {
  loading: false,
  data: null,
  error: null,
};

export const layLoaiCongViecService = createAsyncThunk<
  MenuCongViec[],
  string,
  { rejectValue: AppError }
>('jobType/fetchById', async (maLoaiCongViec, { rejectWithValue }) => {
  try {
    const id = Number(maLoaiCongViec.trim());

    const response = await apiConfig.get<TApiResponse<MenuCongViec[]>>(
      `cong-viec/lay-chi-tiet-loai-cong-viec/${id}`,
    );

    return response.data.content ?? [];
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

const layLoaiCongViecSlice = createSlice({
  name: 'layLoaiCongViec',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layLoaiCongViecService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(layLoaiCongViecService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(layLoaiCongViecService.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload ?? {
          message: 'Không thể tải danh sách loại công việc',
        };
    });
  },
});

export default layLoaiCongViecSlice.reducer;