import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiConfig } from "@services/apiConfig";
import type {
  AppError,
  DSCongViecTheoTen,
  InitState,
  TApiResponse,
} from "@types";
import { normalizeApiError } from "@utils/normalizeApiError";

const initialState: InitState<DSCongViecTheoTen[]> = {
  loading: false,
  data: null,
  error: null,
};

export const layChiTietLoaiCongViecService = createAsyncThunk<
  DSCongViecTheoTen[],
  string,
  { rejectValue: AppError }
>(
  "searchJob/layChiTietLoaiCongViecService",
  async (maLoaiCongViec, { rejectWithValue }) => {
    try {
      const parsedId = Number(maLoaiCongViec.trim());

      if (!parsedId) {
        return rejectWithValue({
          message: "Mã chi tiết loại công việc không hợp lệ.",
        });
      }

      const response = await apiConfig.get<TApiResponse<DSCongViecTheoTen[]>>(
        `cong-viec/lay-cong-viec-theo-chi-tiet-loai/${parsedId}`,
      );

      return response.data.content ?? [];
    } catch (error) {
      return rejectWithValue(normalizeApiError(error));
    }
  },
);

const layChiTietLoaiCongViecSlice = createSlice({
  name: "layChiTietLoaiCongViec",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(layChiTietLoaiCongViecService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      layChiTietLoaiCongViecService.fulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
    );
    builder.addCase(layChiTietLoaiCongViecService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? {
        message: "Không thể tải danh sách chi tiết loại công việc.",
      };
    });
  },
});

export default layChiTietLoaiCongViecSlice.reducer;
