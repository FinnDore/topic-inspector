/**
 * Higher order function that takes an input function and returns a function that wraps the input function inside a try catch for convenance when error handling
 *
 * If the input function returns an error the return type will be [null, Error] else [R, null]
 *
 *
 * ## Example
 * ```
 * import { makeSyncTo } from "./to-sync.ts"
 *
 * const parseJSON = makeSyncTo(JSON.parse);
 * const [value, error]= parse(`{'myKey': 1`)
 *
 * if (error) {
 *      // Do error things
 *      console.error(error)
 * }
 * ```
 *
 * @param {function} fn the input function
 * @returns {void} the result or a parsed error
 */
export function makeSyncTo<A extends unknown[], R>(
    fn: (...args: A) => R
): (...args: A) => [R, null] | [null, Error] {
    return (...args) => {
        try {
            const res = fn(...args);
            return [res, null];
        } catch (e) {
            return [null, e instanceof Error ? e : new Error(String(e))];
        }
    };
}
