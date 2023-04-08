import { ConfigSpec, StringValidator, ValidatorSpec } from './models';

export const str: StringValidator = (spec?: ConfigSpec<string>): ValidatorSpec<string> => {
    const parse = (key: string, value: unknown): string => {
        const s = {
            default: undefined,
            isRequired: false,
            ...((spec ?? {}) as ConfigSpec<string>),
        };

        const out = (value ? String(value) : s.default) as string;

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
