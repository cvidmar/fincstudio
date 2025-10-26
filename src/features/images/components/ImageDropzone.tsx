import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useImageState } from '../image-context'

export function ImageDropzone() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { addFiles } = useImageState()

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return
    const images = Array.from(files).filter((file) => file.type.startsWith('image/'))
    addFiles(images)
  }

  return (
    <div
      className={`rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
        isDragging ? 'border-primary/80 bg-primary/5' : 'border-muted/50'
      }`}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsDragging(false)
        }
      }}
      onDrop={(event) => {
        event.preventDefault()
        setIsDragging(false)
        handleFiles(event.dataTransfer.files)
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Upload className="h-6 w-6" />
      </div>
      <p className="text-base font-medium">Drop film negatives here</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Supports JPG, PNG, and 16-bit TIFF scans. Up to 20 files per batch.
      </p>
      <Button className="mt-4" variant="secondary" onClick={() => inputRef.current?.click()}>
        Browse files
      </Button>
    </div>
  )
}
