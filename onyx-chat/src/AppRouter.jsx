import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/page";
import RootLayout from "./pages/layout";
import ErrorPage from "./pages/error";
import Loading from "./pages/loading";
import Providers from "./components/providers/Providers";
import NotFound from "./pages/not-found";
import ChatPage from "./pages/chat/page";

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
            {
                path: "/chat",
                element: <ChatPage />,
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
