import create from "zustand"
import { devtools } from "zustand/middleware"

interface SelectedChat {
  selectedChatId: number | null
  setSelectedChatId: (id: number) => void
}

export const useSelectedChat = create<SelectedChat>()(
  devtools(set => ({
    selectedChatId: null,
    setSelectedChatId: (id: number) =>
      set(prev => ({ ...prev, selectedChatId: id })),
  }))
)