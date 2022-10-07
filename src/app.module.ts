import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsCountService } from './tweets/tweets-count/tweets-count.service';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'db.sqlite'),
      autoLoadModels: true,
      synchronize: true,
    }),
    TweetsModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
