export const autobind = (_: any, __: string, descriptor: PropertyDescriptor) =>
  ({
    configurable: true,
    enumerable: false,
    get() {
      return descriptor.value.bind(this);
    },
  } as PropertyDescriptor);
