import type { LLMProvider, LLMResponse } from './types';

export class OpenAIProvider implements LLMProvider {
  async enhance(prompt: string, apiKey?: string): Promise<LLMResponse> {
    if (!apiKey) {
      return { enhancedPrompt: '', error: 'OpenAI API Key is required' };
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o', // Defaulting to a high quality model
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that enhances user prompts to be more descriptive and detailed.',
            },
            {
              role: 'user',
              content: `Enhance this prompt: "${prompt}"`,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
      }

      const data = await response.json();
      return {
        enhancedPrompt: data.choices[0].message.content,
      };
    } catch (error) {
      return {
        enhancedPrompt: '',
        error: error instanceof Error ? error.message : 'Unknown error connecting to OpenAI',
      };
    }
  }
}
