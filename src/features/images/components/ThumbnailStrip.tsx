import { cn } from '@/lib/utils'
import { useImageState } from '../image-context'

export function ThumbnailStrip() {
  const { images, activeId, setActive } = useImageState()

  if (!images.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground">
        <p>No images yet</p>
        <p className="mt-1">Upload film negatives to start converting.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {images.map((image) => (
        <button
          key={image.id}
          type="button"
          onClick={() => setActive(image.id)}
          className={cn(
            'relative overflow-hidden rounded-xl bg-muted/30 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            activeId === image.id && 'bg-primary/5 ring-2 ring-primary/60',
          )}
        >
          <div className="aspect-square w-full bg-black/40">
            <img
              src={image.url}
              alt={image.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-2">
            <p className="truncate text-sm font-medium">{image.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Intl.DateTimeFormat(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              }).format(image.createdAt)}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
