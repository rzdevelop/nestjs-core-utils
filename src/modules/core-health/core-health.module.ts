import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CoreHealthService } from './core-health.service';

@Module({})
export class CoreHealthModule {
  static register(): DynamicModule {
    return {
      module: CoreHealthModule,
      imports: [TerminusModule],
      providers: [CoreHealthService],
      exports: [CoreHealthService],
    };
  }
}
