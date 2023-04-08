import { NumberValidator, ConfigSpec, ValidatorSpec } from './models';

export const num: NumberValidator = (spec?: ConfigSpec<number>): ValidatorSpec<number> => {
    const parse = (key: string, value: unknown): number => {
        const s = {
            default: undefined,
            isRequired: false,
            ...((spec ?? {}) as ConfigSpec<number>),
        };

        const out = (value && !Number.isNaN(Number(value)) ? Number(value) : s.default) as number;

        if (s.default === undefined && !s.isRequired) {
            return out;
        }

        if (out === undefined)
            throw new Error(
                `No config found for key "${key}. Did you forget to set it beforehand?${
                    s.explanation ? `\n\t${key}: ${s.explanation}` : ''
                }"`,
            );

        return out;
    };

    return { parse };
};
