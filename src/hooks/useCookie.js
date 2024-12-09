import { useState, useCallback, useEffect } from "react";

const parseCookies = () => {
    return document.cookie.split("; ").reduce((cookies, item) => {
        const [name, value] = item.split("=").map(decodeURIComponent);
        if (name) cookies[name] = value;
        return cookies;
    }, {});
};

export const useCookie = () => {
    const [cookies, setCookies] = useState(() => parseCookies());

    useEffect(() => {
        setCookies(parseCookies());
    }, []);

    const getCookie = useCallback(
        (name) => {
            return cookies[name] || null;
        },
        [cookies]
    );

    const setCookie = useCallback((name, value, options = {}) => {
        const { path = "/", expires, maxAge, domain, secure = false, sameSite = "strict" } = options;

        if (!name || value === undefined) {
            console.error('Both "name" and "value" are required to set a cookie.');
            return;
        }

        const cookieParts = [
            `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
            `path=${path}`,
            domain && `domain=${domain}`,
            expires && `expires=${expires instanceof Date ? expires.toUTCString() : ""}`,
            maxAge && `max-age=${maxAge}`,
            secure && "secure",
            sameSite && `samesite=${sameSite}`,
        ]
            .filter(Boolean)
            .join("; ");

        document.cookie = cookieParts;

        setCookies((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const removeCookie = useCallback(
        (name, options = {}) => {
            if (!name) {
                console.error('"name" is required to remove a cookie.');
                return;
            }

            setCookie(name, "", {
                ...options,
                expires: new Date(0),
            });

            setCookies((prev) => {
                const updatedCookies = { ...prev };
                delete updatedCookies[name];
                return updatedCookies;
            });
        },
        [setCookie]
    );

    return {
        get: getCookie,
        set: setCookie,
        remove: removeCookie,
        getAll: () => ({ ...cookies }),
    };
};
