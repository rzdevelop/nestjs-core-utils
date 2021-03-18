import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions, EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const filePath = `${options.environment || ''}.env`;
    const envFilePath = path.resolve(process.cwd(), options.path, filePath);
    console.log('envFilePath', envFilePath);
    const fileContent = fs.readFileSync(envFilePath);
    console.log('fileContent', fileContent.toString());
    this.envConfig = dotenv.parse(fileContent);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
