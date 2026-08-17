import Card from './Card'
import Skeleton from './Skeleton'

export default function SkeletonCard() {
  return (
    <Card>

      <Skeleton className="mb-8 h-5 w-44" />

      <Skeleton className="mb-6 h-12 w-36" />

      <Skeleton className="mb-3 h-4 w-full" />

      <Skeleton className="mb-3 h-4 w-11/12" />

      <Skeleton className="h-4 w-8/12" />

    </Card>
  )
}