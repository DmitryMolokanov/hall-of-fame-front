import { ThemeMode, useThemeStoreType } from '@/types/themeTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useThemeStore = create<useThemeStoreType>()(
    persist(
        (set, get) => ({
            theme: ThemeMode.LIGHT,

            toggleTheme: () => {
                const newTheme = get().theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
                set({ theme: newTheme })
            },
            setTheme: (theme: ThemeMode) => set({ theme }),
        }),
        {
            name: 'data-theme' // ключ для localStorage
        }
    )
)
