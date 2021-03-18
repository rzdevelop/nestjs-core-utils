import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { CoreConfigService } from './core-config.service';

export class CoreConfigHealthIndicator extends HealthIndicator {
  constructor(private readonly configService: CoreConfigService) {
    super();
    console.log('init CoreConfigHealthIndicator');
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus(key, isHealthy, {
      currentVersion: this.configService.get(key) || `Missing ${key}`,
    });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Version check failed', result);
  }
}
