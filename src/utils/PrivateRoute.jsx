import { useCookieContext } from "@/store/context/cookie-context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const cookieStore = useCookieContext();
    const token = cookieStore.get("token");
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
