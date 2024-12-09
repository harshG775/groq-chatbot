/**
 * Utility function to catch errors from a promise.
 * @param {Promise} promise - The promise to execute.
 * @returns {Promise<[Error|null, any|null]>} - A promise that resolves to an array containing an error or result.
 */
export async function catchError(promise) {
    try {
        const result = await promise;
        return [null, result];
    } catch (error) {
        return [error, null];
    }
}
