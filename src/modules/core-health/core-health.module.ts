import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CoreConfigModule, CoreConfigService } from '../core-config';
import { CoreHealthService } from './core-health.service';

interface CoreHealthModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
}

@Module({})
export class CoreHealthModule {
  static register(options: CoreHealthModuleOptions): DynamicModule {
    return {
      module: CoreHealthModule,
      imports: [TerminusModule, ...(options.imports || [])],
      providers: [CoreHealthService],
      exports: [CoreHealthService],
    };
  }
}
