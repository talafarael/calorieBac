import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegistrModule } from './registr/registr.module';

@Module({
  imports: [LoginModule, RegistrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
