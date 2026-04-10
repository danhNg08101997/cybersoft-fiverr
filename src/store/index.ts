import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@services/login.service';
import registerReducer from '@services/register.service';
import searchJobReducer from '@services/searchJob.service';
import menuCongViecReducer from '@services/menuCongViec.service';
import layChiTietLoaiCongViecReducer from '@services/layChiTietLoaiCongViec.service';
import layLoaiCongViecReducer from '@services/layLoaiCongViec.service';
import layCongViecChiTietReducer from '@services/layCongViecChiTiet.service';
import layBinhLuanTheoCongViecReducer from '@services/layBinhLuanTheoCongViec.service';
import binhLuanReducer from '@services/binhLuan.service';
import thueCongViecReducer from '@services/thueCongViec.service';
import layDanhSachDaThueReducer from '@services/congViecDaThue.service';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    searchJob: searchJobReducer,
    menuCongViec: menuCongViecReducer,
    layChiTietLoaiCongViec: layChiTietLoaiCongViecReducer,
    layLoaiCongViec: layLoaiCongViecReducer,
    layCongViecChiTiet: layCongViecChiTietReducer,
    layBinhLuanTheoCongViec: layBinhLuanTheoCongViecReducer,
    binhLuan: binhLuanReducer,
    thueCongViec: thueCongViecReducer,
    layDanhSachDaThue: layDanhSachDaThueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export default store;