// Types for the LLM Service Layer

export type LLMProviderType = 'local' | 'mock' | 'openai' | 'gemini';

export interface LLMRequest {
  prompt: string;
  provider: LLMProviderType;
  apiKey?: string; // For OpenAI/Gemini
}

export interface LLMResponse {
  enhancedPrompt: string;
  error?: string;
}

export interface LLMProvider {
  enhance(prompt: string, apiKey?: string): Promise<LLMResponse>;
}
