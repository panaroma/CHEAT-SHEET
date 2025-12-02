import type { LLMProvider, LLMResponse } from './types';

export class GeminiProvider implements LLMProvider {
  async enhance(prompt: string, apiKey?: string): Promise<LLMResponse> {
    if (!apiKey) {
      return { enhancedPrompt: '', error: 'Gemini API Key is required' };
    }

    try {
      // Using Gemini 1.5 Flash as a default efficient model
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Enhance the following prompt to be more descriptive, detailed, and suitable for high-quality generation. \n\nOriginal Prompt: "${prompt}"\n\nEnhanced Prompt:`,
            }]
          }]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
      }

      const data = await response.json();
      // Gemini API response structure
      const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!enhancedText) {
        throw new Error('Invalid response format from Gemini API');
      }

      return {
        enhancedPrompt: enhancedText,
      };
    } catch (error) {
      return {
        enhancedPrompt: '',
        error: error instanceof Error ? error.message : 'Unknown error connecting to Gemini',
      };
    }
  }
}
