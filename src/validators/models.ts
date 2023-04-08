/* eslint-disable @typescript-eslint/ban-types */
export interface ConfigSpecBase {
    explanation?: string;
}

export interface ConfigSpecRequired extends ConfigSpecBase {
    default?: undefined;
    isRequired: true;
}

export interface ConfigSpecDefaultValue<T> extends ConfigSpecBase {
    default: T;
    isRequired?: boolean;
}

export interface ConfigSpecUndefined extends ConfigSpecBase {
    default?: undefined;
    isRequired?: false;
}

export type ConfigSpec<T> = ConfigSpecRequired | ConfigSpecDefaultValue<T> | ConfigSpecUndefined;

export interface ValidatorSpecRequired<T> {
    parse(key: string, value: unknown): NonNullable<T>;
}

export interface ValidatorSpecDefaultValue<T> {
    parse(key: string, value: unknown): NonNullable<T>;
}

export interface ValidatorSpecUndefined<T> {
    parse(key: string, value: unknown): T;
}

export type ValidatorSpec<T> =
    | ValidatorSpecRequired<T>
    | ValidatorSpecDefaultValue<T>
    | ValidatorSpecUndefined<T>;

export interface BoolValidator {
    /**
     * Declare boolean config.
     *
     * Return value will be `boolean | undefined` for `get` function.
     *
     * Valid boolean values includes :
     * * **True** : `true`, `t`, `yes`, `y`, `1`
     * * **False** : `false`, `f`, `no`, `n`, `0`
     *
     * If the value is invalid, the function will return undefined.
     *
     * ```typescript
     * config({
     *      myBool: bool(),
     * });
     * ```
     */
    <T extends boolean | undefined = boolean | undefined>(
        spec?: ConfigSpecUndefined,
    ): ValidatorSpecUndefined<T>;

    /**
     * Declare boolean config.
     *
     * Return value will be `boolean` for `get`function. If value is not set, default value will be returned.
     *
     * Valid boolean values includes :
     * * **True** : `true`, `t`, `yes`, `y`, `1`
     * * **False** : `false`, `f`, `no`, `n`, `0`
     *
     * If the value is invalid, the function will return the default value.
     *
     * ```typescript
     * config({
     *      myBool: bool({ default: false }),
     * });
     * ```
     */
    <T extends boolean = boolean>(spec: ConfigSpecDefaultValue<T>): ValidatorSpecDefaultValue<T>;

    /**
     * Declare boolean config.
     *
     * Return value will be `boolean` for `get` function. If value is not set, an error will be thrown.
     *
     * Valid boolean values includes :
     * * **True** : `true`, `t`, `yes`, `y`, `1`
     * * **False** : `false`, `f`, `no`, `n`, `0`
     *
     * If the value is invalid, and error will be thrown.
     *
     * ```typescript
     * config({
     *      myBool: bool({ isRequired: true }),
     * });
     * ```
     */
    <T extends boolean = boolean>(spec: ConfigSpecRequired): ValidatorSpecRequired<T>;
}

export interface DateValidator {
    /**
     * Declare date config.
     *
     * Return value will be `Date | undefined` for `get` function.
     *
     * Valid date value includes all values accepted in the Date constructor.
     *
     * If the value is invalid, the function will return undefined.
     *
     * ```typescript
     * config({
     *      myDate: date(),
     * });
     * ```
     */
    <T extends Date | undefined = Date | undefined>(
        spec?: ConfigSpecUndefined,
    ): ValidatorSpecUndefined<T>;

    /**
     * Declare date config.
     *
     * Return value will be `Date` for `get` function.
     *
     * Valid date value includes all values accepted in the Date constructor.
     *
     * If the value is invalid, the function will return the default value.
     *
     * ```typescript
     * config({
     *      myDate: date({ default: new Date() }),
     * });
     * ```
     */
    <T extends Date = Date>(spec: ConfigSpecDefaultValue<T>): ValidatorSpecDefaultValue<T>;

    /**
     * Declare date config.
     *
     * Return value will be `Date` for `get` function.
     *
     * Valid date value includes all values accepted in the Date constructor.
     *
     * If the value is invalid, an error will be thrown.
     *
     * ```typescript
     * config({
     *      myDate: date({ isRequired: true }),
     * });
     * ```
     */
    <T extends Date = Date>(spec: ConfigSpecRequired): ValidatorSpecRequired<T>;
}

export interface JSONValidator {
    /**
     * Declare JSON config.
     *
     * Return value will be `object | undefined` for `get` function.
     *
     * Valid json value includes all values parsed by JSON.parse.
     *
     * If the value is invalid, the function will return undefined.
     *
     * ```typescript
     * config({
     *      myObject: json<MyType>(),
     * });
     * ```
     */
    <T extends object | undefined = object | undefined>(
        spec?: ConfigSpecUndefined,
    ): ValidatorSpecUndefined<T>;

    /**
     * Declare JSON config.
     *
     * Return value will be `object` for `get` function.
     *
     * Valid json value includes all values parsed by JSON.parse.
     *
     * If the value is invalid, the function will return the default value.
     *
     * ```typescript
     * config({
     *      myObject: json<MyType>({ default: new Date() }),
     * });
     * ```
     */
    <T extends object = object>(spec: ConfigSpecDefaultValue<T>): ValidatorSpecDefaultValue<T>;

    /**
     * Declare JSON config.
     *
     * Return value will be `object` for `get` function.
     *
     * Valid json value includes all values parsed by JSON.parse.
     *
     * If the value is invalid, an error will be thrown.
     *
     * ```typescript
     * config({
     *      myObject: json<MyType>({ isRequired: true }),
     * });
     * ```
     */
    <T extends object = object>(spec: ConfigSpecRequired): ValidatorSpecRequired<T>;
}

export interface NumberValidator {
    /**
     * Declare number config.
     *
     * Return value will be `number | undefined` for `get` function.
     *
     * Valid number value includes all values parsed by the Number constructor.
     *
     * If the value is invalid, the function will return undefined.
     *
     * ```typescript
     * config({
     *      myNumber: num(),
     * });
     * ```
     */
    (spec?: ConfigSpecUndefined): ValidatorSpecUndefined<number | undefined>;

    /**
     * Declare number config.
     *
     * Return value will be `number` for `get` function.
     *
     * Valid number value includes all values parsed by the Number constructor.
     *
     * If the value is invalid, the function will return the default value.
     *
     * ```typescript
     * config({
     *      myNumber: num(),
     * });
     * ```
     */
    (spec: ConfigSpecDefaultValue<number>): ValidatorSpecDefaultValue<number>;

    /**
     * Declare number config.
     *
     * Return value will be `number` for `get` function.
     *
     * Valid number value includes all values parsed by the Number constructor.
     *
     * If the value is invalid, an error will be thrown.
     *
     * ```typescript
     * config({
     *      myNumber: num(),
     * });
     * ```
     */
    (spec: ConfigSpecRequired): ValidatorSpecRequired<number>;
}

export interface StringValidator {
    /**
     * Declare string config.
     *
     * Return value will be `string | undefined` for `get` function.
     *
     * Valid string value includes all values parsed by the String constructor.
     *
     * If the value is invalid, the function will return undefined.
     *
     * ```typescript
     * config({
     *      myString: str(),
     * });
     * ```
     */
    (spec?: ConfigSpecUndefined): ValidatorSpecUndefined<string | undefined>;

    /**
     * Declare string config.
     *
     * Return value will be `string` for `get` function.
     *
     * Valid string value includes all values parsed by the String constructor.
     *
     * If the value is invalid, the function will return the default value.
     *
     * ```typescript
     * config({
     *      myString: str(),
     * });
     * ```
     */
    (spec: ConfigSpecDefaultValue<string>): ValidatorSpecDefaultValue<string>;

    /**
     * Declare string config.
     *
     * Return value will be `string` for `get` function.
     *
     * Valid string value includes all values parsed by the String constructor.
     *
     * If the value is invalid, an error will be thrown.
     *
     * ```typescript
     * config({
     *      myString: str(),
     * });
     * ```
     */
    (spec: ConfigSpecRequired): ValidatorSpecRequired<string>;
}
