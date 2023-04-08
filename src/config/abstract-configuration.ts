import { AbstractConfigFn, ConfigSpecs, ConfigStore, DynamicConfig } from '../models';
import { toGetter, toSetter } from '../utils';

export const AbstractConfiguration: AbstractConfigFn = <T>(
    specs: ConfigSpecs<T>,
    configStore: ConfigStore,
) => {
    const get = <K extends keyof T & string>(key: K): T[K] => {
        return specs[key].parse(
            key as string,
            configStore.has(key) ? configStore.get(key) : undefined,
        );
    };

    const set = <K extends keyof T & string>(key: K, value: NonNullable<T[K]>): void => {
        configStore.set(key, value);
    };

    const pipe = <K extends keyof T & string>(
        key: K,
        callback0: (value: T[K]) => NonNullable<T[K]>,
        ...callback: ((value: NonNullable<T[K]>) => NonNullable<T[K]>)[]
    ): NonNullable<T[K]> => {
        const value = callback.reduce((v, f) => f(v), callback0(get(key))) as NonNullable<T[K]>;
        set(key, value);
        return value;
    };

    const has = <K extends keyof T & string>(key: K): boolean => {
        return configStore.has(key);
    };

    const remove = <K extends keyof T & string>(key: K): void => {
        configStore.delete?.(key);
        configStore.remove?.(key);
    };

    const reset = (): void => {
        configStore.clear();
    };

    const keys = <K extends keyof T & string>(): K[] => {
        return Object.keys(specs) as K[];
    };

    const getters: DynamicConfig<T> = {} as DynamicConfig<T>;

    for (const key of Object.keys(specs) as (keyof T & string)[]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (getters[toGetter(String(key)) as keyof DynamicConfig<T> & string] as any) = () => get(key);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (getters[toSetter(String(key)) as keyof DynamicConfig<T> & string] as any) = (
            value: NonNullable<T[typeof key]>,
        ) => set(key, value);
    }

    return { get, set, pipe, has, remove, reset, keys, ...getters };
};
