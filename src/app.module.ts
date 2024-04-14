import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { GetuserModule } from './getuser/user.module';

@Module({
  imports: [LoginModule, RegisterModule, GetuserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
