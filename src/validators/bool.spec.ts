/* eslint-disable @typescript-eslint/no-magic-numbers */
import { bool } from './bool';

describe('config/validator/bool', () => {
    describe('default', () => {
        const spec = bool();

        it('should parse bool 1', () => {
            expect(spec.parse('', true)).toBeTruthy();
        });

        it('should parse bool 2', () => {
            expect(spec.parse('', 't')).toBeTruthy();
        });

        it('should parse bool 3', () => {
            expect(spec.parse('', '0')).toBeFalsy();
        });

        it('should parse bool 4', () => {
            expect(spec.parse('', 'a')).toEqual(undefined);
        });
    });

    describe('with default value', () => {
        const spec = bool({ default: false });

        it('should return default', () => {
            expect(spec.parse('', undefined)).toBeFalsy();
        });
    });

    describe('with required', () => {
        const spec = bool({ isRequired: true });

        it('should throw error', () => {
            expect(() => spec.parse('', undefined)).toThrowError();
        });
    });
});
