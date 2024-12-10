import { createContext, useCallback, useContext, useState } from "react";

/**
 * @typedef {Object} CookieOptions
 * @property {string} [path="/"] - Path where the cookie is accessible.
 * @property {Date} [expires] - Expiry date of the cookie.
 * @property {number} [maxAge] - Maximum age of the cookie in seconds.
 * @property {string} [domain] - Domain where the cookie is accessible.
 * @property {boolean} [secure=false] - If true, cookie will only be sent over HTTPS.
 * @property {boolean} [httpOnly=false] - If true, cookie will only be accessible by the server.
 * @property {"strict"|"lax"|"none"} [sameSite="strict"] - SameSite policy for the cookie.
 */

// Create context
const CookieContext = createContext(null);

/**
 * Parses `document.cookie` into an object.
 * @returns {Record<string, string>} An object containing all cookies as key-value pairs.
 */
const parseCookies = () => {
    return document.cookie.split("; ").reduce((cookies, item) => {
        const [name, value] = item.split("=").map(decodeURIComponent);
        if (name) cookies[name] = value;
        return cookies;
    }, {});
};

/**
 * Serializes cookie options into a string for `document.cookie`.
 * @param {CookieOptions} [options={}] - The cookie options to serialize.
 * @returns {string} The serialized cookie options.
 */
const serializeCookieOptions = (options = {}) => {
    const { path = "/", expires, maxAge, domain, secure = false, sameSite = "strict", httpOnly = false } = options;

    const optionParts = [];

    if (path) optionParts.push(`path=${path}`);
    if (domain) optionParts.push(`domain=${domain}`);

    if (maxAge) {
        optionParts.push(`max-age=${maxAge}`);
    } else if (expires) {
        optionParts.push(`expires=${expires.toUTCString()}`);
    }

    if (secure) optionParts.push("secure");
    if (httpOnly) optionParts.push("httpOnly");

    if (sameSite) {
        optionParts.push(`samesite=${sameSite}`);
    }

    return optionParts.length > 0 ? `; ${optionParts.join("; ")}` : "";
};

/**
 * Provides cookie manipulation utilities to the React component tree.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} The CookieProvider component.
 */
export function CookieProvider({ children }) {
    const [cookies, setCookies] = useState(() => parseCookies());

    /**
     * Retrieves a cookie by name.
     * @param {string} name - The name of the cookie to retrieve.
     * @returns {string|undefined} The cookie value, or undefined if not found.
     */
    const get = useCallback(
        (name) => {
            return cookies[name];
        },
        [cookies]
    );

    /**
     * Sets a cookie.
     * @param {string} name - The name of the cookie to set.
     * @param {string} value - The value of the cookie to set.
     * @param {CookieOptions} [options={}] - Additional options for the cookie.
     */
    const set = useCallback((name, value, options = {}) => {
        if (!name || value === undefined) {
            console.error('Both "name" and "value" are required to set a cookie.');
            return;
        }
        const encodedValue = encodeURIComponent(value);
        document.cookie = `${name}=${encodedValue}${serializeCookieOptions(options)}`;

        setCookies((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    /**
     * Removes a cookie by name.
     * @param {string} name - The name of the cookie to remove.
     * @param {CookieOptions} [options={}] - Additional options for the cookie.
     */
    const remove = useCallback((name, options = {}) => {
        // Set expiry to past date to remove the cookie
        document.cookie = `${name}=; ${serializeCookieOptions({...options, expires: new Date(0)})}`;

        setCookies((prev) => {
            const newCookies = { ...prev };
            delete newCookies[name];
            return newCookies;
        });
    }, []);

    /**
     * Retrieves all cookies.
     * @returns {Record<string, string>} An object containing all cookies.
     */
    const getAll = useCallback(() => {
        return { ...cookies };
    }, [cookies]);

    return (
        <CookieContext.Provider
            value={{
                get,
                set,
                remove,
                getAll,
            }}
        >
            {children}
        </CookieContext.Provider>
    );
}

/**
 * Custom hook to access cookie utilities.
 * @throws {Error} If the hook is used outside a CookieProvider.
 * @returns {Object} An object with `get`, `set`, `remove`, and `getAll` methods.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useCookieContext = () => {
    const context = useContext(CookieContext);

    if (!context) {
        throw new Error("useCookieContext must be used within a CookieProvider");
    }

    return context;
};
