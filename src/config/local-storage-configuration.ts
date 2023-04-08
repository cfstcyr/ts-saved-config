import store from 'store2';
import { ConfigFn, ConfigSpecs } from '../models';
import { AbstractConfiguration } from './abstract-configuration';

export const LocalStorageConfiguration: ConfigFn = <T>(namespace: string, specs: ConfigSpecs<T>) =>
    AbstractConfiguration(specs, store.namespace(namespace));
