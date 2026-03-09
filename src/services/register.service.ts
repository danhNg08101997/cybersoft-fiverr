import type {AppError, InitState, RegisterPayload, TApiResponse, User} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import {normalizeApiError} from "../utils/normalizeApiError.ts";


const initialState: InitState<User> = {
    loading: false,
    data: null,
    error: null,
};

export const registerService = createAsyncThunk<
    User,
    RegisterPayload,
    { rejectValue: AppError }
>(
    "auth/registerService", async (user, { rejectWithValue }) => {
        try {
            const response = await apiConfig.post<TApiResponse<User>>("auth/signup", user)

            if (!response.data?.content) {
                return rejectWithValue({ message:"Không nhận được dữ liệu đăng ký" });
            }

            return response.data.content;
        }catch(error) {
            return rejectWithValue(normalizeApiError(error));
        }
    }
)

const registerSlice = createSlice({
    name:"register",
    initialState,
    reducers: {
        resetRegisterState: (state) => {
            state.loading = false;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerService.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(registerService.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });

        builder.addCase(registerService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? {
                message: "Đăng ký thất bại. Vui lòng thử lại.",
            };
        });
    },
})

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;