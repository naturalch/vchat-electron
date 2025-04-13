import { AppConfig } from '@/types/index';
import { app } from 'electron';
import path from 'node:path';
import fs from 'fs/promises';

const DEFAULT_CONFIG: AppConfig = {
  language: 'zh',
  fontSize: 14,
  providerConfigs: {},
};

const configPath = path.join(app.getPath('userData'), 'config.json');
let config = { ...DEFAULT_CONFIG };

export const configManager = {
  async load() {
    try {
      const data = await fs.readFile(configPath, 'utf-8');
      config = { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    } catch (error) {
      await this.save();
    }
    return config;
  },

  async save() {
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    return config;
  },

  async update(newConfig: Partial<AppConfig>) {
    config = { ...config, ...newConfig };
    await this.save();
    return config;
  },

  get() {
    return config;
  },
};
