import type { LLMProvider, LLMProviderType } from './types';
import { MockProvider } from './MockProvider';
import { LocalProvider } from './LocalProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { GeminiProvider } from './GeminiProvider';

export class LLMService {
  private static instance: LLMService;
  private providers: Record<LLMProviderType, LLMProvider>;

  private constructor() {
    this.providers = {
      mock: new MockProvider(),
      local: new LocalProvider(),
      openai: new OpenAIProvider(),
      gemini: new GeminiProvider(),
    };
  }

  public static getInstance(): LLMService {
    if (!LLMService.instance) {
      LLMService.instance = new LLMService();
    }
    return LLMService.instance;
  }

  public async enhancePrompt(
    prompt: string,
    providerType: LLMProviderType,
    apiKey?: string
  ) {
    const provider = this.providers[providerType];
    if (!provider) {
      throw new Error(`Provider ${providerType} not found`);
    }
    return provider.enhance(prompt, apiKey);
  }
}
