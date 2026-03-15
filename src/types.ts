import type {JSX} from "react";
import * as React from "react";
import {type Dayjs} from "dayjs";

export type AppError = {
    message: string;
    statusCode?: number;
};

export type InitState<T> = {
    loading: boolean;
    data: T | null;
    error: AppError | null;
}

export type RouteType = {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    nested?: RouteType[]
}

export type TApiResponse<T> = {
    statusCode?: number;
    message?: string;
    content?: T;
}

export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    birthday?: string;
    gender?: string;
    role: "USER" | "ADMIN";
    skill?: string[];
    certification?: string[];
};

export type LoginResponse = {
    token: string;
    user: User;
};

export type AuthModalProps = {
    isOpen: boolean;
    onClose?: () => void;
    onSwitchToLogin?: () => void;
    onSwitchToRegister?: () => void;
}

export type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string;
    birthday?: Dayjs;
    gender?: string;
    skill?: string[];
    certification?: string[];
};

export type User = {
    id?: number;
    name?: string;
    email: string;
    password: string;
    phone?: string;
    birthday?: string;
    gender?: string;
    role: "ADMIN" | "USER";
    skill?: Array<string>;
    certification?: Array<string>;
}

export interface ServiceInterface {
    title: string
    subtitle: string
    img: string
}

export type FooterCol = {
    title: string;
    items: Array<{ label: string; subLabel?: string }>;
};

export type MarketItem = {
    label: string;
    icon: React.ReactNode;
};

export type Testimonial = {
    name: string;
    role: string;
    brand: string;
    quote: string;
    videoThumb: string;
};

export type Feature = {
    title: string;
    desc: string;
};

export type PopularTag = string;

export type CongViec = {
    id: number;
    tenCongViec: string;
    danhGia: number;
    giaTien: number;
    nguoiTao: number;
    hinhAnh: string;
    moTa: string;
    maChiTietLoaiCongViec: number;
    moTaNgan: string;
    saoCongViec: number;
}

export type DSCongViecTheoTen = {
    id: number;
    congViec: CongViec;
    tenLoaiCongViec: string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai: string;
    tenNguoiTao: string;
    avatar: string;
}

export type MenuCongViec = {
    id: number;
    tenLoaiCongViec: string;
    dsNhomChiTietLoai: DsNhomChiTietLoai[];
}

export type DsNhomChiTietLoai = {
    id: number;
    tenNhom: string;
    hinhAnh: string;
    maLoaiCongviec: number;
    dsChiTietLoai: DsChiTietLoai[];
}

export type DsChiTietLoai = {
    id: number;
    tenChiTiet: string;
}

export type BinhLuan = {
    id: number;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number;
    tenNguoiBinhLuan: string;
    avatar: string;
}

export type BinhLuanRequst = {
    maCongviec: number;
    maNguoiBinhLuan: number | undefined;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number;
}