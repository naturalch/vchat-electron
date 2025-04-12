import { ChatMessageProps, UniversalChunkProps } from '@/types/index';

export abstract class BaseProvider {
  abstract chat(message: ChatMessageProps[], modelName: string): Promise<AsyncIterable<UniversalChunkProps>>;

  protected abstract transformResponse(chunk: any): UniversalChunkProps;
}
