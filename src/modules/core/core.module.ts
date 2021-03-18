import { DynamicModule, Module } from '@nestjs/common';
import { CoreModuleOptions } from './interfaces';
import { CoreConfigModule } from '../core-config';

@Module({})
export class CoreModule {
  static register(options: CoreModuleOptions): DynamicModule {
    return {
      module: CoreModule,
      imports: [CoreConfigModule.register(options.configOptions)],
      providers: [],
      exports: [CoreConfigModule],
    };
  }
}
