import {lazy, type JSX} from "react";
import * as React from "react";
import {Route} from "react-router-dom";


type RouteType = {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    nested?: RouteType[]
}

const routes: RouteType[] = [
    {
        path: "",
        element: lazy(() => import("@pages/home"))
    },
    {
        path: "admin",
        element: lazy(() => import("@pages/admin")),
        nested: [
            {
                path: "dashboard",
                element: lazy(() => import("@pages/admin/dashboard")),
            }
        ]
    },
    {
        path: 'sign-in',
        element: lazy(()=>import("@pages/auth//login")),
    },
    {
        path: 'sign-up',
        element: lazy(()=>import("@pages/auth/register")),
    },
    {
        path:'*',
        element: lazy(()=>import("@pages/pageNotFound"))
    }
]


export const renderRoutes = () => {
    return routes.map((route) => {
        if(route.nested) {
            return (
                <Route key={route.path} path={route.path} element={<route.element/>}>
                    {route.nested.map((nestedRoute)=> (
                        <Route key={nestedRoute.path} path={nestedRoute.path} element={<nestedRoute.element/>}
                        />
                    ))}
                </Route>
            )
        }
        return <Route key={route.path} path={route.path} element={<route.element/>} />;
    })
}