type Constructor<T = {}> = new (...args: any[]) => T;

export function Base<TBase extends Constructor>(Base?: TBase): TBase {
   return (Base || class {}) as any;
}
