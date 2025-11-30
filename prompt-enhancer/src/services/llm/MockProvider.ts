import type { LLMProvider, LLMResponse } from './types';

export class MockProvider implements LLMProvider {
  async enhance(prompt: string): Promise<LLMResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      enhancedPrompt: `[MOCK ENHANCED] ${prompt}\n\nAdditional context: This is a simulated enhancement to demonstrate the UI functionality without an external API.`,
    };
  }
}
