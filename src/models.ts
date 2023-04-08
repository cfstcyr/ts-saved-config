import { ValidatorSpec } from './validators';

export enum ConfigType {
    File = 'file',
    LocalStorage = 'local-storage',
}

export type ConfigTypeStr = 'file' | 'local-storage';

export type DynamicConfigGet<T> = {
    /**
     * Get value from settings
     */
    [K in keyof T as `get${Capitalize<K extends string ? K : ''>}`]: () => T[K];
};

export type DynamicConfigSet<T> = {
    /**
     * Get value from settings
     */
    [K in keyof T as `set${Capitalize<K extends string ? K : ''>}`]: (
        value: NonNullable<T[K]>,
    ) => void;
};

export type DynamicConfig<T> = DynamicConfigGet<T> & DynamicConfigSet<T>;

export type RestrictedConfig<T> = {
    /**
     * Get value from settings
     *
     * @param key
     * @returns
     */
    get: <K extends keyof T & string>(key: K) => T[K];

    /**
     * Set value to settings
     *
     * @param key
     * @param value
     */
    set: <K extends keyof T & string>(key: K, value: NonNullable<T[K]>) => void;

    /**
     * Pipe value from settings through a series of operators and sets its value.
     *
     * **Example usage :**
     * ```typescript
     * // Get value from settings, multiply it by 4, max its value by 12, then store its value in the settings and returns it.
     * const updatedNumber = mySettings.get(
     *      'number',
     *      (value) => (value ?? 1) * 4,
     *      (value) => Math.max(value, 12),
     * );
     * ```
     *
     * **Example with operators :**
     * ```typescript
     * const clamp =
     *      (min: number, max: number) =>
     *      (value: number | undefined) =>
     *          Math.min(max, Math.max(value ?? 0));
     *
     * // Get value from settings, clamp it between 0 and 10, then store its value in the settings and returns it.
     * const updatedNumber = mySettings.get('number', clamp(0, 10));
     * ```
     *
     * @param key
     * @param callback
     * @returns Value returned by the operators
     */
    pipe: <K extends keyof T & string>(
        key: K,
        operator0: (value: T[K]) => NonNullable<T[K]>,
        ...operators: ((value: NonNullable<T[K]>) => NonNullable<T[K]>)[]
    ) => NonNullable<T[K]>;

    /**
     * Check whether a key has a value set.
     *
     * @param key
     * @returns
     */
    has: <K extends keyof T & string>(key: K) => boolean;

    /**
     * Removes value from settings
     *
     * @param key
     */
    remove: <K extends keyof T & string>(key: K) => void;

    /**
     * Removes all values from settings. (Only affect values in this instance of settings)
     */
    reset: () => void;

    keys: <K extends keyof T & string>() => K[];
};

export type Config<T> = DynamicConfig<T> & RestrictedConfig<T>;

export type ConfigSpecs<T> = { [K in keyof T]: ValidatorSpec<T[K]> };

export interface ConfigStoreDelete {
    delete: (key: string) => void;
}

export interface ConfigStoreRemove {
    remove: (key: string) => void;
}

export type ConfigStore = {
    get: <T>(key: string) => T;
    set: <T>(key: string, value: T) => void;
    has: (key: string) => boolean;
    clear: () => void;
    delete?: (key: string) => void;
    remove?: (key: string) => void;
} & (ConfigStoreDelete | ConfigStoreRemove);

export interface ConfigFn {
    /**
     * Creates settings instance in namespace
     *
     * **Example :**
     * ```typescript
     * const config = Configuration('my-namespace', {
     *      number: num(),
     *      string: str({ default: '' }),
     *      date: date({ isRequired: true }),
     * });
     *
     * // Returns number or undefined
     * const myNumber = mySettings.get('number');
     * // Returns string or default value
     * const myString = mySettings.get('string');
     * // Returns date of throw if not present
     * const myDate = mySettings.get('date');
     * ```
     *
     * @param namespace Groups settings fields togethers
     * @param specs
     */
    <T>(namespace: string, specs: ConfigSpecs<T>): Config<T>;
}

export interface AbstractConfigFn {
    <T>(specs: ConfigSpecs<T>, configStore: ConfigStore): Config<T>;
}

export interface ConfigFactoryFn {
    /**
     * Creates settings instance in namespace
     *
     * **Example :**
     * ```typescript
     * const config = Configuration('file', 'my-namespace', {
     *      number: num(),
     *      string: str({ default: '' }),
     *      date: date({ isRequired: true }),
     * });
     *
     * // Returns number or undefined
     * const myNumber = mySettings.get('number');
     * // Returns string or default value
     * const myString = mySettings.get('string');
     * // Returns date of throw if not present
     * const myDate = mySettings.get('date');
     * ```
     *
     * @param configType Type of config to use
     * @param namespace Groups settings fields togethers
     * @param specs
     */
    <T>(
        configType: ConfigType | ConfigTypeStr,
        namespace: string,
        specs: ConfigSpecs<T>,
    ): Config<T>;
}

export type KeyofConfig<C> = C extends Config<infer T> ? keyof T & string : never;
