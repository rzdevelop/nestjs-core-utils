import { DynamicModule, Logger, Module } from '@nestjs/common';
import { CoreModuleOptions } from './interfaces';
import { CoreConfigModule } from '../core-config';
import { CoreHealthModule } from '../core-health';

@Module({})
export class CoreModule {
  static register(options: CoreModuleOptions): DynamicModule {
    Logger.log('Init', CoreModule.name);
    return {
      module: CoreModule,
      imports: [
        CoreConfigModule.register(options.configOptions),
        CoreHealthModule.register(),
      ],
      exports: [CoreConfigModule, CoreHealthModule],
    };
  }
}
