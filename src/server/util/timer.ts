/**
 * Promise-fied setTimeout
 * @param fn
 * @param delay unit: second
 * @returns
 */
export const delayFinally = (
  fn: Function = () => {},
  delay: number
): Promise<void> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        fn();
        resolve();
      } catch (e: unknown) {
        reject(e);
      }
    }, delay * 1000)
  );

export const delay = (delay: number): Promise<void> =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, delay * 1000)
  );

/**
 * Promise-fied setInterval
 * @param fn
 * @param interval unit: second
 * @returns
 */
export const interval = (fn: Function, interval: number): Promise<void> =>
  new Promise((resolve, reject) =>
    setInterval(() => {
      try {
        fn();
        resolve();
      } catch (e: unknown) {
        reject(e);
      }
    }, interval * 1000)
  );
