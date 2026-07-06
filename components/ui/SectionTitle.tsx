interface SectionTitleProps {
  title: string
  subtitle: string
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-16 text-center">
      <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-400">
        {subtitle}
      </p>
    </div>
  )
}