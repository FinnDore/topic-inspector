export async function to<T = unknown, K = Error>(promise: () => Promise<T>) {
    try {
        return [await promise, null];
    } catch (e) {
        return [null, e as K];
    }
}
