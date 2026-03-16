import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '@services/login.service.ts'
import registerReducer from '@services/register.service.ts'
import searchJobReducer from '@services/searchJob.service.ts'
import menuCongViecReducer from '@services/menuCongViec.service.ts'
import layChiTietLoaiCongViecReducer from '@services/layChiTietLoaiCongViec.service.ts'
import layLoaiCongViecReducer from '@services/layLoaiCongViec.service.ts'
import layCongViecChiTietReducer from '@services/layCongViecChiTiet.service.ts'
import layBinhLuanTheoCongViecReducer from '@services/layBinhLuanTheoCongViec.service'
import binhLuanReducer from '@services/binhLuan.service'
import thueCongViecReducer from '@services/thueCongViec.service.ts'
import layDanhSachDaThueReducer from '@services/congViecDaThue.service.ts'

export const store = configureStore({
    reducer: {
        loginReducer,
        registerReducer,
        searchJobReducer,
        menuCongViecReducer,
        layChiTietLoaiCongViecReducer,
        layLoaiCongViecReducer,
        layCongViecChiTietReducer,
        layBinhLuanTheoCongViecReducer,
        binhLuanReducer,
        thueCongViecReducer,
        layDanhSachDaThueReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;