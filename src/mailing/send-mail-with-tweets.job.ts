import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class SendMailWithTweetsJob {
    @Process()
    async handleJob(job: Job) {
        console.log('Job data:', job.data);
    }
    }
