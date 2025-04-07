import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AnthropicController } from './anthropic/anthropic.controller';
import { AnthropicService } from './anthropic/anthropic.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AnthropicModule } from './anthropic/anthropic.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, AnthropicModule],
  providers: [AppService, AnthropicService, AuthService],
  controllers: [AnthropicController, AuthController],
})
export class AppModule {}
