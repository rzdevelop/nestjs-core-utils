import { DynamicModule, Logger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CoreHealthService } from './core-health.service';

@Module({})
export class CoreHealthModule {
  static register(): DynamicModule {
    Logger.log('Init', CoreHealthModule.name);

    return {
      module: CoreHealthModule,
      imports: [TerminusModule],
      providers: [CoreHealthService],
      exports: [CoreHealthService],
    };
  }
}
