/**
 * Takes a promise then evaluates it returning [null, error] if it throws an error and [R, null] if it does not.
 *
 * ## Example
 * ```
 * import { to } from "./to.ts".
 *
 * const [value, error]= await to(fetchCuteCats({ colour: "purple", amount: infinity }))
 *
 * if (error) {
 *      // Do error things. Failed to load cute cats >:(
 *      console.error(error)
 * }
 * ```
 *
 * @param {Promise<number>} promise the input promise
 * @returns {Promise<[R, null] | [null, Error]>} the result or a parsed error
 */
export async function to<R>(
    promise: () => Promise<R>
): Promise<[R, null] | [null, Error]> {
    try {
        return [await promise(), null];
    } catch (e) {
        return [null, e instanceof Error ? e : new Error(String(e))];
    }
}
