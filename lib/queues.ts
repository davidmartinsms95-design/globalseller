import { Queue } from 'bullmq'

import { redis } from './redis'

export const marketplaceQueue =
  new Queue(
    'marketplace-events',
    {
      connection: redis,
    }
  )