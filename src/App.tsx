import { ImageProvider } from '@/features/images/image-context'
import { ImageDropzone } from '@/features/images/components/ImageDropzone'
import { ThumbnailStrip } from '@/features/images/components/ThumbnailStrip'
import { MainPreview } from '@/features/viewer/MainPreview'
import { ParameterSidebar } from '@/features/controls/ParameterSidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Download, Layers, Sparkles } from 'lucide-react'

function AppContent() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 lg:px-8 xl:px-12">
      <header className="flex flex-col gap-4 rounded-2xl border border-border/40 bg-card/30 p-6 text-foreground shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Finc Studio</p>
          <h1 className="mt-1 text-2xl font-semibold">Film Negative Converter</h1>
          <p className="text-sm text-muted-foreground">
            Client-side, non-destructive film processing pipeline powered by Pixi + WebGL.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" className="gap-2">
            <Layers className="h-4 w-4" />
            Layout Spec
          </Button>
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            Export (coming soon)
          </Button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
        <aside className="flex flex-col gap-4">
          <ImageDropzone />
          <div className="flex grow flex-col rounded-2xl border border-border/40 bg-card/30">
            <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Scans</p>
                <p className="text-xs text-muted-foreground">Thumbnails reflect converted view.</p>
              </div>
              <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs text-muted-foreground">
                Cmd + U
              </Button>
            </div>
            <ScrollArea className="h-[520px] px-4 py-4">
              <ThumbnailStrip />
            </ScrollArea>
          </div>
        </aside>

        <main className="min-h-[620px]">
          <MainPreview />
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" className="gap-2">
              <Download className="h-4 w-4" />
              Export current
            </Button>
            <Button variant="outline">Reset current</Button>
          </div>
        </main>

        <aside className="min-h-[620px]">
          <ParameterSidebar />
        </aside>
      </section>
    </div>
  )
}

export default function App() {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_60%)]">
        <AppContent />
        <Separator className="mx-auto mt-8 w-32 opacity-20" />
        <p className="pb-8 pt-3 text-center text-xs text-muted-foreground">
          MVP build · WebGL pipeline wiring begins in Phase 2
        </p>
      </div>
    </ImageProvider>
  )
}
