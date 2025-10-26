import { useState } from 'react'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Control = {
  key: string
  label: string
  min: number
  max: number
  step?: number
  unit?: string
  helper: string
}

const defaultControls: Control[] = [
  {
    key: 'curve',
    label: 'Curve Strength',
    min: -100,
    max: 100,
    helper: 'Tweaks the tone curve intensity. Actual spline controls arrive in Phase 2.',
  },
  {
    key: 'levels',
    label: 'Levels Midpoint',
    min: 0.1,
    max: 3,
    step: 0.1,
    helper: 'Sets the global gamma pivot.',
  },
  {
    key: 'whiteBalance',
    label: 'White Balance',
    min: -500,
    max: 500,
    step: 25,
    unit: 'K',
    helper: 'Offsets Kelvin temperature before HSL adjustments.',
  },
  {
    key: 'clarity',
    label: 'Clarity',
    min: 0,
    max: 100,
    helper: 'Simulated micro-contrast placeholder.',
  },
]

export function ParameterSidebar() {
  const defaultValues: Record<string, number> = {
    curve: 0,
    levels: 1.0,
    whiteBalance: -100,
    clarity: 12,
  }
  const [values, setValues] = useState<Record<string, number>>(defaultValues)

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/40 bg-card/40">
      <div className="border-b border-border/40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Conversion Parameters</p>
            <p className="text-xs text-muted-foreground">Real-time shader controls arrive next.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setValues(defaultValues)}>
            Reset
          </Button>
        </div>
      </div>
      <TooltipProvider delayDuration={150}>
        <ScrollArea className="grow px-4">
          <div className="space-y-6 py-4">
            {defaultControls.map((control) => (
              <div key={control.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{control.label}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
                        {control.helper}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                <span className="text-xs text-muted-foreground">
                  {values[control.key]?.toFixed(control.step && control.step < 1 ? 1 : 0)}
                  {control.unit ? ` ${control.unit}` : ''}
                </span>
              </div>
              <Slider
                value={[values[control.key] ?? control.min]}
                min={control.min}
                max={control.max}
                step={control.step ?? 1}
                onValueChange={([newValue]) =>
                  setValues((prev) => ({ ...prev, [control.key]: newValue }))
                }
              />
              <div className="flex justify-between text-[11px] uppercase tracking-wide text-muted-foreground">
                <span>{control.min}</span>
                <span>{control.max}</span>
              </div>
                <Separator className="opacity-30" />
              </div>
            ))}
            <div className="rounded-xl bg-muted/20 p-3 text-xs text-muted-foreground">
              Detailed per-stage controls (Curves, Levels, HSL, Clarity, Sharpening) will live here.
              Wiring the sliders now gives us the container to hook shader uniforms into during
              Phase 2.
            </div>
          </div>
        </ScrollArea>
      </TooltipProvider>
    </div>
  )
}
