export class ResponseError extends Error {
    constructor(message, response) {
        super(message);
        this.response = response;
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
    const response = await fetch(input, init);
    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({})); // Fallback to empty object if JSON parsing fails
        throw new ResponseError(`Fetch failed with status ${response.status}`, { ...response, ...errorDetails });
    }
    return response;
}
