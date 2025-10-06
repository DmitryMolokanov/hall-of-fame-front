import { ThemeMode, useThemeStoreType } from '@/types/ThemeTypes'
import { create } from 'zustand'




export const useThemeStore = create<useThemeStoreType>((set) => ({
    theme: ThemeMode.LIGHT,

    toggleTheme: () => set((state) => ({ theme: state.theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT }))

}))