import { BaseProvider } from './BaseProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { QianfanProvider } from './QianfanProvider';
import { configManager } from '../config';

export function createProvider(providerName: string): BaseProvider {
  const config = configManager.get();
  const providerConfig = config.providerConfigs[providerName] || {};

  switch (providerName) {
    case 'deepseek':
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少DeepSeek API配置：请在设置中配置 apiKey 和 baseUrl');
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl);
    case 'dashscope':  // 阿里百炼
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少通义千问API配置：请在设置中配置 apiKey 和 baseUrl');
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl);
    case 'qianfan': // 百度千帆
      if (!providerConfig.accessKey || !providerConfig.secretKey) {
        throw new Error('缺少千帆API配置：请在设置中配置 accessKey 和 secretKey');
      }
      return new QianfanProvider(providerConfig.accessKey, providerConfig.secretKey);
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}
