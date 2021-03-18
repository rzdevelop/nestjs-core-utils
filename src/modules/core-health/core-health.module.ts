import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
} from '@nestjs/common';
import { TerminusModule, HealthIndicatorResult } from '@nestjs/terminus';
import { CoreConfigModule, CoreConfigService } from '../core-config';
import { CORE_HEALTH_RESULTS } from './constants';
import { CoreHealthService } from './core-health.service';

interface CoreHealthModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useFactory?: (
    ...args: any[]
  ) => (Promise<HealthIndicatorResult> | HealthIndicatorResult)[];
}

@Module({})
export class CoreHealthModule {
  static register(options: CoreHealthModuleOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: CoreHealthModule,
      imports: [TerminusModule, ...(options.imports || [])],
      providers: [CoreHealthService, ...providers],
      exports: [CoreHealthService],
    };
  }

  private static createAsyncProviders(
    options: CoreHealthModuleOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: CORE_HEALTH_RESULTS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }
    return [];
  }
}
