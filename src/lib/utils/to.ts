/**
 * Utility function to catch errors from a promise.
 * @template T
 * @param {Promise<T>|T} promise - The promise or value to execute.
 * @returns {Promise<[Error|undefined, T|undefined]>} - A promise that resolves to an array containing an error or result.
 *
 * @example
 * const [error, result] = await to(somePromise());
 * if (error) {
 *     console.error(error);
 * } else {
 *     console.log(result);
 * }

 */

export async function to<T>(promise: Promise<T>): Promise<[Error | undefined, T | undefined]> {
    return promise
        .then((result) => {
            return [undefined, result] as [Error | undefined, T | undefined];
        })
        .catch((error) => {
            return [error instanceof Error ? error : new Error(String(error)), undefined];
        });
}
