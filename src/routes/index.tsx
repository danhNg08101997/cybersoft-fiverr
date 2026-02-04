import {lazy} from "react";
import {Route} from "react-router-dom";
import type {RouteType} from "../types.ts";

const routes: RouteType[] = [
    {
        path: "",
        element: lazy(() => import("@pages/HomeTemplate")),
        nested: [
            {
                path: "",
                element: lazy(() => import("@pages/HomeTemplate/Home")),
            }
        ]
    },
    {
        path: "admin",
        element: lazy(() => import("@pages/AdminTemplate")),
        nested: [ ]
    },
    {
        path:'*',
        element: lazy(()=>import("@pages/PageNotFound"))
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