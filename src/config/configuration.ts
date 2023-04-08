import { ConfigFactoryFn, ConfigSpecs, ConfigType, ConfigTypeStr } from '../models';
import { FileStorageConfiguration } from './file-storage-configuration';
import { LocalStorageConfiguration } from './local-storage-configuration';

export const Configuration: ConfigFactoryFn = <T>(
    configType: ConfigType | ConfigTypeStr,
    namespace: string,
    specs: ConfigSpecs<T>,
) => {
    return configType === ConfigType.File
        ? FileStorageConfiguration<T>(namespace, specs)
        : LocalStorageConfiguration<T>(namespace, specs);
};
