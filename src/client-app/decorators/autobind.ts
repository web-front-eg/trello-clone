export function autobind(
  _: any,
  __: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  return <PropertyDescriptor>{
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };
}
