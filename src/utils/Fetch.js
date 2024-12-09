class ResponseError extends Error {
    constructor(message, res) {
        super(message);
        this.response = res;
    }
}

/**
 * Performs a fetch request and throws an error if the response is not OK.
 * @param {RequestInfo | URL} input - The resource you want to fetch. This can be a URL string or a Request object.
 * @param {RequestInit} [init] - An options object containing custom settings for the request.
 * @returns {Promise<Response>} - The resolved Response object if the request is successful.
 * @throws {ResponseError} - If the fetch response status is not OK (i.e., not in the range 200–299).
 */
export async function Fetch(input, init) {
    const res = await fetch(input, init);
    if (!res.ok) {
        throw new ResponseError("Bad fetch response", res);
    }
    return res;
}
