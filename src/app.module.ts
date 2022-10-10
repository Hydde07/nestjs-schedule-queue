import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsCountService } from './tweets/tweets-count/tweets-count.service';
import { TweetsModule } from './tweets/tweets.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'db.sqlite'),
      autoLoadModels: true,
      synchronize: true,
    }),
    TweetsModule,
    MailingModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
