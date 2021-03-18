import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CoreConfigService } from './core-config.service';
import { CORE_CONFIG_OPTIONS } from './constants';
import { CoreConfigModuleOptions } from './interfaces';

@Module({})
export class CoreConfigModule {
  static register(options: CoreConfigModuleOptions): DynamicModule {
    const optionProvider: Provider = {
      provide: CORE_CONFIG_OPTIONS,
      useValue: options,
    };

    return {
      global: true,
      module: CoreConfigModule,
      providers: [optionProvider, CoreConfigService],
      exports: [optionProvider, CoreConfigService],
    };
  }
}
