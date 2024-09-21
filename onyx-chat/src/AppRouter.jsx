import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/page";
import RootLayout from "./pages/layout";
import ErrorPage from "./pages/error";
import Loading from "./pages/loading";
import Providers from "./components/providers/Providers";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        loader: Loading,
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
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
