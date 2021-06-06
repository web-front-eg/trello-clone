/**
 * Promise-fied setTimeout
 * @param fn
 * @param delay unit: second
 * @returns
 */
export const delayFinally = (fn: Function = () => {}, delay: number = 0) =>
  new Promise<void>((resolve, reject) =>
    setTimeout(() => {
      try {
        fn();
        resolve();
      } catch (e: unknown) {
        reject(e);
      }
    }, delay != 0 ? delay * 1000 : 0)
  );

export const delay = (delay: number = 0) =>
  new Promise<void>(resolve =>
    setTimeout(
      () => {
        resolve();
      },
      delay != 0 ? delay * 1000 : 0
    )
  );

/**
 * Promise-fied setInterval
 * @param fn
 * @param interval unit: second
 * @returns
 */
export const interval = (fn: Function, interval: number) =>
  new Promise<void>((resolve, reject) =>
    setInterval(() => {
      try {
        fn();
        resolve();
      } catch (e: unknown) {
        reject(e);
      }
    }, interval * 1000)
  );
