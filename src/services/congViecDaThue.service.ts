import type {
  AppError,
  CongViecDaThue,
  InitState,
  TApiResponse,
} from '@types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiConfig } from '@services/apiConfig';
import { normalizeApiError } from '@utils/normalizeApiError';

const initialState: InitState<CongViecDaThue[]> = {
  loading: false,
  data: null,
  error: null,
};

export const layDanhSachDaThueService = createAsyncThunk<
  CongViecDaThue[],
  void,
  { rejectValue: AppError }
>('order/fetchRentedJobs', async (_, { rejectWithValue }) => {
  try {
    const response = await apiConfig.get<TApiResponse<CongViecDaThue[]>>(
      'thue-cong-viec/lay-danh-sach-da-thue',
    );

    return response.data.content ?? [];
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

const layDanhSachDaThueSlice = createSlice({
  name: 'layDanhSachDaThue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layDanhSachDaThueService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(layDanhSachDaThueService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(layDanhSachDaThueService.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload ?? { message: 'Không thể tải danh sách công việc đã thuê.' };
    });
  },
});

export default layDanhSachDaThueSlice.reducer;