import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useLogStore } from '@/store/useLogStore'

const log = (role, action) => useLogStore.getState().addLog(role, action)

export const useRequestStore = create(
    persist(
        (set, get) => ({
            role: 'user',
            view: 'main',
            requests: [],

            setRole: (role) => set({ role }),
            setView: (view) => set({ view }),

            addRequest: (title, description) =>
                set((state) => {
                    log(get().role, `Створено заявку «${title}»`)
                    return {
                        requests: [
                            ...state.requests,
                            {
                                id: crypto.randomUUID(),
                                title,
                                description,
                                status: 'new',
                                createdAt: Date.now(),
                            },
                        ],
                    }
                }),

            updateRequest: (id, data) =>
                set((state) => {
                    const req = state.requests.find((r) => r.id === id)
                    log(get().role, `Відредаговано заявку «${req?.title ?? id}»`)
                    return {
                        requests: state.requests.map((r) =>
                            r.id === id ? { ...r, ...data } : r
                        ),
                    }
                }),

            deleteRequest: (id) =>
                set((state) => {
                    const req = state.requests.find((r) => r.id === id)
                    log(get().role, `Видалено заявку «${req?.title ?? id}»`)
                    return {
                        requests: state.requests.filter((r) => r.id !== id),
                    }
                }),

            changeStatus: (id, status) =>
                set((state) => {
                    const req = state.requests.find((r) => r.id === id)
                    log(
                        get().role,
                        `Статус заявки «${req?.title ?? id}» → ${status}`
                    )
                    return {
                        requests: state.requests.map((r) =>
                            r.id === id ? { ...r, status } : r
                        ),
                    }
                }),
        }),
        { name: 'request-store' }
    )
)