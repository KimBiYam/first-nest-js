import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
