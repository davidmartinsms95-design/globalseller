import { Queue } from 'bullmq'

export const marketplaceQueue = new Queue(
  'marketplace-events',
  {
    connection: {
      host: '127.0.0.1',
      port: 6379,
    },
  }
)