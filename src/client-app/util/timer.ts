/**
 * Promise-fied setTimeout and execute fn
 * @param fn
 * @param delay unit: second
 * @returns
 */
export function delayFinally(fn: Function = () => {}, delay: number = 0) {
  if (delay < 0) {
    throw new Error("delay can't be negative");
  }

  const _delay: number = delay >= 0 ? delay * 1000 : 0;

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      try {
        fn();
        resolve();
      } catch (e: unknown) {
        reject(e);
      }
    }, _delay);
  });
}

/**
 * being await until the promise is resolved and fulfilled
 * @param delay unit: second
 */
export function delay(delay: number = 0) {
  if (delay < 0) {
    throw new Error("delay can't be negative");
  }

  const _delay: number = delay >= 0 ? delay * 1000 : 0;

  return new Promise<void>(resolve =>
    setTimeout(() => {
      resolve();
    }, _delay)
  );
}

/**
 * Promise-fied setInterval
 * @param fn
 * @param interval unit: second
 * @returns
 */
export function interval(fn: Function, interval: number) {
  if (interval < 0) {
    throw new Error("interval can't be negative");
  }

  return new Promise<void>((resolve, reject) =>
    setInterval(() => {
      try {
        fn();
        resolve();
      } catch (e: unknown) {
        reject(e);
      }
    }, interval * 1000)
  );
}
