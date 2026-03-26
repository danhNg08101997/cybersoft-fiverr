import type { AppError, BinhLuan, InitState, TApiResponse } from '@types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiConfig } from '@services/apiConfig';
import { normalizeApiError } from '@utils/normalizeApiError';

const initialState: InitState<BinhLuan[]> = {
  loading: false,
  data: null,
  error: null,
};

export const layBinhLuanTheoCongViecService = createAsyncThunk<
  BinhLuan[],
  string,
  { rejectValue: AppError }
>('comment/fetchByJobId', async (maCongViec, { rejectWithValue }) => {
  try {
    const parsedId = Number(maCongViec.trim());

    if (!parsedId) {
      return rejectWithValue({ message: 'Mã công việc không hợp lệ.' });
    }

    const response = await apiConfig.get<TApiResponse<BinhLuan[]>>(
      `binh-luan/lay-binh-luan-theo-cong-viec/${parsedId}`,
    );

    return response.data.content ?? [];
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

const layBinhLuanTheoCongViecSlice = createSlice({
  name: 'layBinhLuanTheoCongViec',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layBinhLuanTheoCongViecService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(layBinhLuanTheoCongViecService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(layBinhLuanTheoCongViecService.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload ?? { message: 'Không thể tải danh sách bình luận.' };
    });
  },
});

export default layBinhLuanTheoCongViecSlice.reducer;