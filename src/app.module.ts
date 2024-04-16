import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GetuserModule } from './getuser/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ GetuserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
