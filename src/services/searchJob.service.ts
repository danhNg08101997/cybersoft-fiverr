import type {CongViec, DSCongViecTheoTen, InitState, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";

const initialState: InitState<DSCongViecTheoTen<CongViec>> = {
    loading: false,
    data: null,
    error: null,
}

export const searchJobService = createAsyncThunk(
    "search/searchJob",
    async (jobName, {rejectWithValue}) => {
        try{
            const response = await apiConfig.get<TApiResponse<DSCongViecTheoTen<CongViec>>>(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${jobName}`);
            return response.data.content
        }catch (error){
            return rejectWithValue(error);
        }
    }
)

const searchJobSlice = createSlice({
    name: "searchJob",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(searchJobService.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(searchJobService.fulfilled,(state,action)=>{
            state.loading = false;
            state.data = action.payload as DSCongViecTheoTen<CongViec>
        })
        builder.addCase(searchJobService.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload as AxiosError<never>
        })
    }
})

export default searchJobSlice.reducer;