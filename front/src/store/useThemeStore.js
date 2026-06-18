import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const LIGHT = 'requestSystem'
const DARK = 'requestSystemDark'

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: LIGHT,
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === LIGHT ? DARK : LIGHT,
                })),
            setTheme: (theme) => set({ theme }),
        }),
        { name: 'theme-store' }
    )
)

export const THEMES = { LIGHT, DARK }