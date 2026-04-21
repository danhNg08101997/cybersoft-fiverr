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

export const layDSCongViecTheoTenService = createAsyncThunk<
  DSCongViecTheoTen[],
  string,
  { rejectValue: AppError }
>('searchJob/fetchByName', async (tenCongViec, { rejectWithValue }) => {
  try {
    const keyword = encodeURIComponent(tenCongViec.trim());

    const response = await apiConfig.get<TApiResponse<DSCongViecTheoTen[]>>(
      `cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`,
    );

    return response.data.content ?? [];
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

const layDSCongViecTheoTenSlice = createSlice({
  name: 'searchJob',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layDSCongViecTheoTenService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(layDSCongViecTheoTenService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(layDSCongViecTheoTenService.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload ?? {
          message: 'Không thể tải danh sách công việc',
        };
    });
  },
});

export default layDSCongViecTheoTenSlice.reducer;