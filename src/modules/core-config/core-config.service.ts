import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CORE_CONFIG_OPTIONS } from './constants';
import { CoreConfigOptions, EnvConfig } from './interfaces';

@Injectable()
export class CoreConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CORE_CONFIG_OPTIONS) options: CoreConfigOptions) {
    const filePath = `${options.environment || ''}.env`;
    const envFilePath = path.resolve(process.cwd(), options.path, filePath);
    console.log('envFilePath', envFilePath);
    const fileContent = fs.readFileSync(envFilePath);
    console.log('fileContent', fileContent.toString());
    this.envConfig = dotenv.parse(fileContent);
  }

  get(key: string): string | undefined {
    return this.envConfig[key];
  }
}
