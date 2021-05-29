export const delay = (fn: Function, delay: number): Promise<void> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        fn();
        resolve();
      } catch (e: unknown) {
        reject(e);
      }
    }, delay)
  );

export const interval = (fn: Function, interval: number): Promise<void> =>
  new Promise((resolve, reject) =>
    setInterval(() => {
      try {
        fn();
        resolve();
      } catch (e: unknown) {
        reject(e);
      }
    }, interval)
  );
