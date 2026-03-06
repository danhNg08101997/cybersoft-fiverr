import type {DSCongViecTheoTen, InitState, TApiResponse} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";

const initialState: InitState<DSCongViecTheoTen[]> = {
    loading: false,
    data: null,
    error: null,
}

export const searchJobService = createAsyncThunk(
    "searchJob/searchJobService",
    async (tenCongViec:string , thunkAPI) => {
        try{
            const keyword = encodeURIComponent(tenCongViec.trim());

            const response = await apiConfig.get<TApiResponse<DSCongViecTheoTen[]>>(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`);

            return response.data.content ?? response.data;
        }catch (error){
            return thunkAPI.rejectWithValue( error || "Không thể tải danh sách công việc" );
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
            state.data = action.payload as DSCongViecTheoTen[]
        })
        builder.addCase(searchJobService.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload as AxiosError<never>
        })
    }
})

export default searchJobSlice.reducer;