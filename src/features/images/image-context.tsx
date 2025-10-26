import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `img-${Date.now()}-${Math.random().toString(16).slice(2)}`

export type FilmImage = {
  id: string
  name: string
  url: string
  file: File
  createdAt: number
}

type ImageState = {
  images: FilmImage[]
  activeId: string | null
  selectedIds: string[]
}

type ImageAction =
  | { type: 'ADD_IMAGES'; payload: FilmImage[] }
  | { type: 'SET_ACTIVE'; payload: string }
  | { type: 'CLEAR_ALL' }

const initialState: ImageState = {
  images: [],
  activeId: null,
  selectedIds: [],
}

function imageReducer(state: ImageState, action: ImageAction): ImageState {
  switch (action.type) {
    case 'ADD_IMAGES': {
      const images = [...state.images, ...action.payload]
      const activeId = state.activeId ?? action.payload[0]?.id ?? null
      const selectedIds = activeId ? [activeId] : []
      return { images, activeId, selectedIds }
    }
    case 'SET_ACTIVE': {
      return { ...state, activeId: action.payload, selectedIds: [action.payload] }
    }
    case 'CLEAR_ALL': {
      return initialState
    }
    default:
      return state
  }
}

type ImageContextValue = ImageState & {
  addFiles: (files: File[]) => void
  setActive: (id: string) => void
  clearAll: () => void
}

const ImageContext = createContext<ImageContextValue | undefined>(undefined)

export function ImageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(imageReducer, initialState)

  const addFiles = useCallback((files: File[]) => {
    if (!files.length) return
    const payload = files.map((file) => ({
      id: createId(),
      name: file.name,
      url: URL.createObjectURL(file),
      file,
      createdAt: Date.now(),
    }))
    dispatch({ type: 'ADD_IMAGES', payload })
  }, [])

  const setActive = useCallback((id: string) => {
    dispatch({ type: 'SET_ACTIVE', payload: id })
  }, [])

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' })
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      addFiles,
      setActive,
      clearAll,
    }),
    [state, addFiles, setActive, clearAll],
  )

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
}

export function useImageState() {
  const ctx = useContext(ImageContext)
  if (!ctx) {
    throw new Error('useImageState must be used within ImageProvider')
  }
  return ctx
}
