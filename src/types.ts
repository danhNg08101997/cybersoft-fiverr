import type {AxiosError} from "axios";
import * as React from "react";
import type {JSX} from "react";

export type InitState<T> = {
    loading: boolean;
    data: T | null;
    error: AxiosError<never> | null;
}

export type TApiResponse<T> = {
    statusCode: number;
    message?: string;
    content?: T;
}

export type RouteType = {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    nested?: RouteType[]
}

export type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
}