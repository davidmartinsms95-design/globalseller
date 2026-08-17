interface SkeletonProps {
  className?: string
}

export default function Skeleton({
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-xl
        bg-zinc-800
        ${className}
      `}
    >
      <div
        className="
          absolute
          inset-0
          animate-pulse
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />
    </div>
  )
}