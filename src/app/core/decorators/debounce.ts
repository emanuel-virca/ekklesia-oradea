export function Debounce(delay: number = 50): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    let timeout = null;

    const original = descriptor.value;

    descriptor.value = function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
