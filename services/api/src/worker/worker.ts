import Bull from 'bull'
import axios from 'axios'
import { exec } from 'child_process'
import path from 'path'

const videoQueue = new Bull('video-processing', { redis: { host: process.env.REDIS_HOST || 'redis', port: 6379 } })

videoQueue.process(async (job) => {
  const { url, key } = job.data
  // Simplified: download and transcode via ffmpeg (assumes ffmpeg available in worker image)
  const input = `/tmp/input-${job.id}`
  const output = `/tmp/output-${job.id}.m3u8`
  // NOTE: proper implementation should stream and handle errors
  exec(`ffmpeg -i ${url} -c:v libx264 -preset veryfast -crf 23 -g 48 -sc_threshold 0 -f hls -hls_time 4 -hls_playlist_type vod ${output}`, (err, stdout, stderr) => {
    if (err) {
      console.error('ffmpeg error', err)
      throw err
    }
    // Upload output to S3 (MinIO) - simplified placeholder
    console.log('Transcode complete for job', job.id)
  })
})

console.log('Worker started, waiting for jobs...')
