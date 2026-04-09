import type { JSX, LazyExoticComponent } from "react";

export type RouteElement = LazyExoticComponent<() => JSX.Element>;

export type RouteType = {
    path: string;
    element: RouteElement;
    nested?: RouteType[];
};