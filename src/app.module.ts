import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GetuserModule } from './getuser/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ GetuserModule, AuthModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
