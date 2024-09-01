import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Providers from "./components/providers/Providers";

import HomePage from "./pages/page";
import RootLayout from "./pages/layout";
import ErrorPage from "./pages/error";
import Loading from "./pages/loading";
import NotFound from "./pages/not-found";
import ChatPage from "./pages/chat/page";
import ChatLayout from "./pages/chat/layout";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        loader: Loading,
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/chat",
                element: <ChatLayout />,
                children: [
                    {
                        index: true,
                        element: <ChatPage />,
                    },
                ],
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
