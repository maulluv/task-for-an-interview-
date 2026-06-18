import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLogStore = create(
    persist(
        (set) => ({
            logs: [],

            addLog: (role, action) =>
                set((state) => ({
                    logs: [
                        {
                            id: crypto.randomUUID(),
                            role,
                            action,
                            timestamp: Date.now(),
                        },
                        ...state.logs,
                    ],
                })),

            clearLogs: () => set({ logs: [] }),
        }),
        { name: 'log-store' }
    )
)