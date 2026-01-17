import { Controller, Post, Body } from '@nestjs/common'
import Bull from 'bull'

@Controller('api/videos')
export class VideoController {
  private queue: any
  constructor() {
    this.queue = new Bull('video-processing', { redis: { host: process.env.REDIS_HOST || 'redis' } })
  }

  @Post('upload')
  async upload(@Body() payload) {
    // payload: { url }
    const job = await this.queue.add({ url: payload.url })
    return { jobId: job.id }
  }
}