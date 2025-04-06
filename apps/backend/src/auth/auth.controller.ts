import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private authService = new AuthService();

  @Post('sign-up')
  async createUser(
    @Body() body: { email: string; password: string; displayName?: string },
  ) {
    await this.authService.signUp(body.email, body.password, body.displayName);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    await this.authService.login(body.email, body.password);
  }
}
