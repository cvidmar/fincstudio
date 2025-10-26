import { ImageIcon } from 'lucide-react'
import { useImageState } from '@/features/images/image-context'

export function MainPreview() {
  const { images, activeId } = useImageState()
  const activeImage = images.find((image) => image.id === activeId)

  if (!activeImage) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
        <ImageIcon className="mb-4 h-12 w-12 opacity-40" />
        <p className="text-lg font-semibold text-foreground">Preview will appear here</p>
        <p className="mt-2 max-w-md text-sm">
          Upload film negatives to load the conversion preview. Adjustments update in real-time once
          the shader pipeline is connected.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/40 bg-gradient-to-b from-white/5 to-transparent shadow-inner">
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <div>
          <p className="text-sm font-semibold">{activeImage.name}</p>
          <p className="text-xs text-muted-foreground">Original scan preview</p>
        </div>
        <span className="rounded-full bg-secondary/60 px-3 py-1 text-xs uppercase tracking-wide text-secondary-foreground">
          Draft
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center bg-black/40 p-4">
        <img
          src={activeImage.url}
          alt={activeImage.name}
          className="max-h-full max-w-full rounded-lg object-contain shadow-lg"
        />
      </div>
    </div>
  )
}
