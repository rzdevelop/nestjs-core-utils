import { Inject } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { CORE_HEALTH_RESULTS } from './constants';

export class CoreHealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,
    @Inject(CORE_HEALTH_RESULTS)
    options: (Promise<HealthIndicatorResult> | HealthIndicatorResult)[],
  ) {
    console.log('options', options);
  }

  healthCheck() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 3000 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async () => await this.db.pingCheck('db', { timeout: 60000 }),
      async () => this.http.pingCheck('google', 'https://google.com'),
    ]);
  }
}
