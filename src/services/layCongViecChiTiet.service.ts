import type {
  AppError,
  DSCongViecTheoTen,
  InitState,
  TApiResponse,
} from '@types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiConfig } from '@services/apiConfig';
import { normalizeApiError } from '@utils/normalizeApiError';

const initialState: InitState<DSCongViecTheoTen[]> = {
  loading: false,
  data: null,
  error: null,
};

export const layCongViecChiTietService = createAsyncThunk<
  DSCongViecTheoTen[],
  string,
  { rejectValue: AppError }
>('job/fetchDetail', async (maCongViec, { rejectWithValue }) => {
  try {
    const parsedId = Number(maCongViec.trim());

    if (!parsedId) {
      return rejectWithValue({ message: 'Mã công việc không hợp lệ.' });
    }

    const response = await apiConfig.get<TApiResponse<DSCongViecTheoTen[]>>(
      `cong-viec/lay-cong-viec-chi-tiet/${parsedId}`,
    );

    return response.data.content ?? [];
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

const layCongViecChiTietSlice = createSlice({
  name: 'layCongViecChiTiet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layCongViecChiTietService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(layCongViecChiTietService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(layCongViecChiTietService.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload ?? { message: 'Không thể tải chi tiết công việc.' };
    });
  },
});

export default layCongViecChiTietSlice.reducer;