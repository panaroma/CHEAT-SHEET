import type { LLMProvider, LLMResponse } from './types';

export class LocalProvider implements LLMProvider {
  private baseUrl: string;
  private model: string;

  constructor(baseUrl = 'http://localhost:11434', model = 'llama3') {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async enhance(prompt: string): Promise<LLMResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt: `Enhance the following prompt to be more descriptive, detailed, and suitable for high-quality generation. \n\nOriginal Prompt: "${prompt}"\n\nEnhanced Prompt:`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Local LLM Error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        enhancedPrompt: data.response,
      };
    } catch (error) {
      return {
        enhancedPrompt: '',
        error: error instanceof Error ? error.message : 'Unknown error connecting to Local LLM',
      };
    }
  }
}
