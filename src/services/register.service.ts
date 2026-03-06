import type {InitState, RegisterPayload, TApiResponse, User} from "@types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiConfig} from "@services/apiConfig.ts";
import type {AxiosError} from "axios";


const initialState: InitState<User> = {
    loading: false,
    data: null,
    error: null,
};

export const registerService = createAsyncThunk<
    User,
    RegisterPayload,
    { rejectValue: AxiosError<never> }
>(
    "auth/registerService", async (user, { rejectWithValue }) => {
        try {
            const response = await apiConfig.post<TApiResponse<User>>("auth/signup", user)

            if (!response.data?.content) {
                throw new Error("Không nhận được dữ liệu đăng ký");
            }

            return response.data.content;
        }catch(error) {
            return rejectWithValue(error as AxiosError<never>);
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
            state.data = null;
        });

        builder.addCase(registerService.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(registerService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ?? null;
        });
    },
})

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;