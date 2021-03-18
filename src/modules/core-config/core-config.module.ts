import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CoreConfigService } from './core-config.service';
import { CORE_CONFIG_OPTIONS } from './constants';
import { CoreConfigModuleOptions } from './interfaces';
import { CoreConfigHealthIndicator } from './core-config.health.indicator';

@Module({})
export class CoreConfigModule {
  static register(options: CoreConfigModuleOptions): DynamicModule {
    const optionProvider: Provider = {
      provide: CORE_CONFIG_OPTIONS,
      useValue: options,
    };

    return {
      module: CoreConfigModule,
      providers: [optionProvider, CoreConfigService, CoreConfigHealthIndicator],
      exports: [optionProvider, CoreConfigService, CoreConfigHealthIndicator],
    };
  }
}
