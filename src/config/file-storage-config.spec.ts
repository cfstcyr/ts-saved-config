/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Config } from '../models';
import { num } from '../validators';
import { FileStorageConfiguration } from './file-storage-configuration';

describe('FileStorageConfig', () => {
    let config: Config<{ test: number | undefined }>;

    beforeEach(() => {
        config = FileStorageConfiguration('test', {
            test: num(),
        });
        config.reset();
    });

    describe('pipe', () => {
        it('should pipe', () => {
            const initialValue = 4;
            const add = 8;

            config.set('test', initialValue);

            config.pipe('test', (val) => (val ?? 0) + add);

            expect(config.get('test')).toEqual(initialValue + add);
        });
    });

    describe('has', () => {
        it('should return false if not there', () => {
            expect(config.has('test')).toBeFalsy();
        });

        it('should return true if is there', () => {
            config.set('test', 4);
            expect(config.has('test')).toBeTruthy();
        });
    });

    describe('remove', () => {
        it('should remove', () => {
            config.set('test', 4);
            config.remove('test');
            expect(config.has('test')).toBeFalsy();
        });
    });
});
