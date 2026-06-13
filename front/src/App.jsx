import { useRequestStore } from '@/store/useRequestStore'
import { RoleSwitcher } from '@/components/RoleSwitcher'
import { UserView } from '@/pages/UserView'
import { ManagerView } from '@/pages/ManagerView'

function App() {
    const role = useRequestStore((s) => s.role)

    return (
        <div className="min-h-screen">
            <header className="bg-base-100 border-b border-base-300">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src="/favicon.svg"
                            alt="Логотип"
                            className="w-8 h-8"
                        />
                        <h1 className="text-xl font-bold">Mini Request System</h1>
                    </div>
                    <RoleSwitcher />
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6">
                {role === 'user' ? <UserView /> : <ManagerView />}
            </main>
        </div>
    )
}

export default App
