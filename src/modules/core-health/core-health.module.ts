import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CoreConfigModule, CoreConfigService } from '../core-config';
import { CoreHealthService } from './core-health.service';

@Module({})
export class CoreHealthModule {
  static register(): DynamicModule {
    return {
      module: CoreHealthModule,
      imports: [TerminusModule, CoreConfigModule],
      providers: [CoreConfigService, CoreHealthService],
      exports: [CoreHealthService],
    };
  }
}
