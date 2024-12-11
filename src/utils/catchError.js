/**
 * Utility function to catch errors from a promise.
 * @template T
 * @param {Promise<T>|T} promise - The promise or value to execute.
 * @returns {Promise<[Error|undefined, T|undefined]>} - A promise that resolves to an array containing an error or result.
 */
export async function catchError(promise) {
    try {
        const result = promise instanceof Promise 
            ? await promise 
            : promise;
        return [undefined, result];
    } catch (error) {
        return [error instanceof Error ? error : new Error(String(error)), null];
    }
}
