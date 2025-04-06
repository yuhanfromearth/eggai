import Anthropic from '@anthropic-ai/sdk';
import { Injectable } from '@nestjs/common';
import { SYSTEM_PROMPT } from 'src/lib/prompts';

@Injectable()
export class AnthropicService {
  private client: Anthropic;
  private shortTermHistory: Map<string, Anthropic.MessageParam[]> = new Map();
  private MAX_HISTORY_LENGTH = 15;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async getStreamingResponse(userId: string, userMessage: string) {
    this.appendToHistory(userId, userMessage, 'user');

    return await this.client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      temperature: 0.8,
      system: SYSTEM_PROMPT,
      messages: this.shortTermHistory.get(userId)!,
      stream: true,
    });
  }

  appendToHistory(userId: string, content: string, role: 'user' | 'assistant') {
    const userHistory = this.shortTermHistory.get(userId) || [];
    userHistory.push({ role: role, content: content });

    if (userHistory.length > this.MAX_HISTORY_LENGTH) {
      userHistory.splice(-this.MAX_HISTORY_LENGTH);
    }

    this.shortTermHistory.set(userId, userHistory);
  }
}
