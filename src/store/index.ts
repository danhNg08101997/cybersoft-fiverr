import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '@services/login.service.ts'
import registerReducer from '@services/register.service.ts'

export const store = configureStore({
    reducer: {
        loginReducer,
        registerReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;