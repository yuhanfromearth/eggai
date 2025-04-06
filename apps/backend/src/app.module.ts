import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AnthropicController } from './anthropic/anthropic.controller';
import { AnthropicService } from './anthropic/anthropic.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AppService, AnthropicService],
  controllers: [AnthropicController],
})
export class AppModule {}
