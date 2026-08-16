'use client'

interface ProductImageUploadProps {
  image: string
  onUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
}

export default function ProductImageUpload({
  image,
  onUpload,
}: ProductImageUploadProps) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-zinc-300">
        Imagem do Produto
      </label>

      <input
        type="file"
        onChange={onUpload}
        className="
          w-full
          rounded-2xl
          border
          border-dashed
          border-zinc-700
          bg-zinc-900
          p-4
          text-zinc-400
          file:mr-4
          file:rounded-xl
          file:border-0
          file:bg-orange-500
          file:px-4
          file:py-2
          file:font-semibold
          file:text-white
          hover:file:bg-orange-400
        "
      />

      {image && (
        <>
          <img
            src={image}
            alt="Preview do produto"
            className="
              mt-6
              h-56
              w-full
              rounded-2xl
              border
              border-zinc-700
              object-cover
            "
          />

          <p className="mt-3 truncate text-xs text-zinc-500">
            {image}
          </p>
        </>
      )}

    </div>
  )
}