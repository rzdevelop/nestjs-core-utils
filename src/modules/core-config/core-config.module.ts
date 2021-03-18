import { DynamicModule, Module } from '@nestjs/common';
import { CoreConfigService } from './core-config.service';
import { CORE_CONFIG_OPTIONS } from './constants';
import { CoreConfigModuleOptions } from './interfaces';

@Module({})
export class CoreConfigModule {
  static register(options: CoreConfigModuleOptions): DynamicModule {
    return {
      module: CoreConfigModule,
      providers: [
        {
          provide: CORE_CONFIG_OPTIONS,
          useValue: options,
        },
        CoreConfigService,
      ],
      exports: [CoreConfigService],
    };
  }
}
