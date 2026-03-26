import type { AppError, InitState, TApiResponse, ThueCongViec } from '@types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { normalizeApiError } from '@utils/normalizeApiError';
import { apiConfig } from '@services/apiConfig';

const initialState: InitState<ThueCongViec> = {
  loading: false,
  data: null,
  error: null,
};

export const thueCongViecService = createAsyncThunk<
  ThueCongViec,
  ThueCongViec,
  { rejectValue: AppError }
>('order/create', async (thueCongViec, { rejectWithValue }) => {
  try {
    const response = await apiConfig.post<TApiResponse<ThueCongViec>>(
      'thue-cong-viec',
      thueCongViec,
    );

    if (!response.data?.content) {
      return rejectWithValue({ message: 'Không nhận được dữ liệu thuê công việc.' });
    }

    return response.data.content;
  } catch (error) {
    return rejectWithValue(normalizeApiError(error));
  }
});

const thueCongViecSlice = createSlice({
  name: 'thueCongViec',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thueCongViecService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(thueCongViecService.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(thueCongViecService.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload ?? { message: 'Thuê công việc thất bại. Vui lòng thử lại.' };
    });
  },
});

export default thueCongViecSlice.reducer;