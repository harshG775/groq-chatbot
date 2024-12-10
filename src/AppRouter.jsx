import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/page";
import TestPage from "./pages/test/page.jsx";
import RootLayout from "./pages/layout";
import ErrorPage from "./pages/error";
import Loading from "./pages/loading";
import Providers from "./components/providers/Providers";
import NotFound from "./pages/not-found";
import LoginPage from "./pages/(auth)/login/page";
import PrivateRoute from "./utils/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/",
        errorElement: <ErrorPage />,
        loader: Loading,
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: (
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/test",
                element: <TestPage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default function AppRouter() {
    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    );
}
