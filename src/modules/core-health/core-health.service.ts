import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

export class CoreHealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,
  ) {}

  healthCheck() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 3000 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async () => await this.db.pingCheck('db', { timeout: 60000 }),
      async () => this.http.pingCheck('google', 'https://google.com'),
    ]);
  }
}
