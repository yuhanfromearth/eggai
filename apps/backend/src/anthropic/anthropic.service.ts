import { Injectable } from '@nestjs/common';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from 'src/lib/prompts';

@Injectable()
export class AnthropicService {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async getStreamingResponse(userMessage: string) {
    return await this.client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      temperature: 0.8,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
      stream: true,
    });
  }
}
