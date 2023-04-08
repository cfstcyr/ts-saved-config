import { JSONValidator, ConfigSpec, ValidatorSpec } from './models';

// eslint-disable-next-line @typescript-eslint/ban-types
export const json: JSONValidator = <T extends object = object>(
    spec?: ConfigSpec<T>,
): ValidatorSpec<T> => {
    const parse = (key: string, value: unknown): T => {
        const s = { default: undefined, isRequired: false, ...((spec ?? {}) as ConfigSpec<T>) };

        let j = typeof value === 'object' ? value : undefined;

        if (j === undefined) {
            try {
                j = JSON.parse(String(value));
            } catch (e) {
                //
            }
        }

        const out = (j ? j : s.default) as T;

        if (s.default === undefined && !s.isRequired) {
            return out;
        }

        if (!out)
            throw new Error(
                `No config found for key "${key}. Did you forget to set it beforehand?${
                    s.explanation ? `\n\t${key}: ${s.explanation}` : ''
                }"`,
            );

        return out;
    };

    return { parse };
};
