import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <div className="grid place-content-center min-h-96">
            <h1 className="text-4xl font-semibold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            {isRouteErrorResponse(error) && (
                <p> <i>{error.status || error.statusText}</i> </p>
            )}
        </div>
    );
}
