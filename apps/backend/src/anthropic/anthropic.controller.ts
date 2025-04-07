import { Controller, Body, Res, Post, UseGuards } from '@nestjs/common';
import { AnthropicService } from './anthropic.service';
import { Response } from 'express';
import { SupabaseAuthGuard } from 'src/auth/supabaseauth.guard';

@UseGuards(SupabaseAuthGuard)
@Controller('anthropic')
export class AnthropicController {
  constructor(private anthropicService: AnthropicService) {}

  @Post('stream')
  async getStreamingResponse(
    @Body() body: { userMessage: string },
    @Res() res: Response,
  ) {
    const userMessage = body.userMessage;

    if (!userMessage) {
      res.status(400).send('user message needed');
      return;
    }

    try {
      // SSE headers
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      const stream = await this.anthropicService.getStreamingResponse(
        'placeholder_user_id',
        userMessage,
      );

      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta &&
          'text' in chunk.delta
        ) {
          const textChunk = (chunk.delta as { text: string }).text || '';

          // "data:" prefix -> marks this as part of SSE event
          // "\n\n" -> marks the end of this event according to the SSE protocol
          res.write(`data: ${JSON.stringify({ text: textChunk })}\n\n`);
        }
      }

      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (e) {
      console.error(e);
      if (!res.headersSent) {
        res.status(500).send('An error occurred');
      } else {
        res.write(
          `data: ${JSON.stringify({ error: 'An error occurred' })}\n\n`,
        );
        res.end();
      }
    }
  }
}
