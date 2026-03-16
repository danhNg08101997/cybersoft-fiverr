import type {CongViecDaThue, InitState, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";

const initialState: InitState<CongViecDaThue[]> = {
    loading: false,
    data: null,
    error: null,
}

export const layDanhSachDaThueService = createAsyncThunk(
    "searchJob/layDanhSachDaThue",
    async (_, thunkAPI)=>{
        try {
            const response = await apiConfig.get<TApiResponse<CongViecDaThue[]>>("thue-cong-viec/lay-danh-sach-da-thue")

            return response.data.content ?? response.data;
        }catch (error){
            return thunkAPI.rejectWithValue( error || "Không thể tải danh sách bình luận công việc" );
        }
    }
)

const layDanhSachDaThueSlice = createSlice({
    name: "layDanhSachDaThue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(layDanhSachDaThueService.pending, (state)=> {
            state.loading = true
        })

        builder.addCase(layDanhSachDaThueService.fulfilled, (state, action)=> {
            state.loading = false
            state.data = action.payload as CongViecDaThue[]
        })

        builder.addCase(layDanhSachDaThueService.rejected, (state, action)=> {
            state.loading = false
            state.error = action.payload as AxiosError<never>
        })
    }
})

export default layDanhSachDaThueSlice.reducer;