import { Module } from '@nestjs/common';
import { SupabaseAuthGuard } from 'src/auth/supabaseauth.guard';
import { AnthropicService } from './anthropic.service';
import { AnthropicController } from './anthropic.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AnthropicController],
  providers: [AnthropicService, SupabaseAuthGuard],
  exports: [AnthropicService],
})
export class AnthropicModule {}
