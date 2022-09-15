/**
 * Handle async module
 * @module /lib/handle-async.ts
 *
 * @version 1.0.0
 * @description Utils for handling async operations
 */

/**
 * @param promise A promise whose error needs to be handled
 * @param [logError=true] Whether to log the error or not (default: true, optional)
 * @param [errorId] A unique id to identify `this` error (optional)
 *
 * @returns A promise whose value is `[error, result]`. If there is no error then the
 * error will be `null` and the result will be the resolved value of the promise. If
 * there is an error then the error will be the error object and the result will be
 * `null`.
 */

export const handleAsync = async (
  promise: Promise<any>,
  logError: boolean = true,
  errorId?: string
): Promise<any[]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    if (logError) console.error(errorId ?? "", err);
    return [err, null];
  }
};
