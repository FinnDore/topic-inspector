/**
 * Takes an input function and returns a new function which when when called runs the input function with the given arguments
 * and returns the result as the first item of the result. If the input function returns an error the first
 * item in the result will be null and the last item will be the error.
 *
 * ## Example
 * ```
 * import { makeSyncTo } from "./to-sync.ts"
 *
 * const parse = makeSyncTo(JSON.parse);
 * const = parse(`{'myKey': 1`)
 * ```
 * ##
 * @param fn the input function
 * @param parseError the function to parse the error
 * @returns the result or a parsed error
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
