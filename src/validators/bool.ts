import { BoolValidator, ConfigSpec, ValidatorSpec } from './models';
import { parseBool } from '../utils';

export const bool: BoolValidator = <T extends boolean = boolean>(
    spec?: ConfigSpec<T>,
): ValidatorSpec<T> => {
    const parse = (key: string, value: unknown): T => {
        const s = { default: undefined, isRequired: false, ...((spec ?? {}) as ConfigSpec<T>) };

        const b = parseBool(value);
        const out = (b !== undefined ? b : s.default) as T;

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
