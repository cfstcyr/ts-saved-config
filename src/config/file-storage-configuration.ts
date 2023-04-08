import { ConfigFn, ConfigSpecs } from '../models';
import Configstore from 'configstore';
import { AbstractConfiguration } from './abstract-configuration';

export const FileStorageConfiguration: ConfigFn = <T>(namespace: string, specs: ConfigSpecs<T>) =>
    AbstractConfiguration(specs, new Configstore(namespace));
