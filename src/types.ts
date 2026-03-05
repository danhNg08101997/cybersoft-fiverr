import type {AxiosError} from "axios";
import * as React from "react";
import type {JSX} from "react";

export type InitState<T> = {
    loading: boolean;
    data: T | null;
    error: AxiosError<never> | null;
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

export type LoginResponse = {
    token: string;
    user: User;
};

export type AuthModalProps = {
    isOpen: boolean;
    onClose?: () => void;
}

export type User = {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    birthday?: string;
    gender?: string;
    role?: string;
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
    id: string;
    tenCongViec: string;
    danhGia: string;
    giaTien: string;
    nguoiTao: string;
    hinhAnh: string;
    moTa: string;
    maChiTietLoaiCongViec: string;
    moTaNgan: string;
    saoCongViec: string;
}

export type DSCongViecTheoTen<T> = {
    id: string;
    congViec: T | null;
    tenLoaiCongViec: string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai: string;
    tenNguoiTao: string;
    avatar: string;
}