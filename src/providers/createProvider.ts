import { BaseProvider } from './BaseProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { QianfanProvider } from './QianfanProvider';

// TODO: 模型扩展
export function createProvider(providerName: string): BaseProvider {
  switch (providerName) {
    case 'deepseek':
      return new OpenAIProvider(
        process.env['DEEPSEEK_VCHAT_API_KEY'] || '',
        process.env['DEEPSEEK_BASE_URL'] || '',
      );
    case 'dashscope':  // 阿里百炼
      return new OpenAIProvider(
        process.env['DASHSCOPE_API_KEY'] || '',
        process.env['DASHSCOPE_BASE_URL'] || '',
      );
    case 'qianfan': // 百度千帆
      return new QianfanProvider(
        process.env['QIANFAN_ACCESS_KEY'] || '',
        process.env['QIANFAN_SECRET_KEY'] || '',
      );
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}
