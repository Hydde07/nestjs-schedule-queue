import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetsCountService {
    private limit = 10;
    constructor(
        @InjectModel(Tweet)
        private tweetModel: typeof Tweet,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        @InjectQueue('email')
        private emailQueue: Queue,
    ) {}

    @Interval(1000)
    async count() {
        let offset = await this.cacheManager.get<number>('tweet-offset');
        const tweets = await this.tweetModel.findAll({
            offset: offset,
            limit: this.limit,
        });
        console.log('counting');

        if (tweets.length === this.limit) {
            this.cacheManager.set('tweet-offset', offset + this.limit);
            console.log(`achou mais de ${this.limit} tweets`);
            this.emailQueue.add({tweets: tweets.map((t) => t.toJSON())});
        }
    }

}
