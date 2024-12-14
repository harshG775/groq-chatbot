const parseCookies = () => {
    return document.cookie.split("; ").reduce((cookies, item) => {
        const [name, value] = item.split("=").map(decodeURIComponent);
        if (name) cookies[name] = value;
        return cookies;
    }, {});
};
export default parseCookies;
