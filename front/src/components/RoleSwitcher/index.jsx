import { useRequestStore } from '@/store/useRequestStore'

const roles = [
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
]

export const RoleSwitcher = () => {
    const role = useRequestStore((s) => s.role)
    const setRole = useRequestStore((s) => s.setRole)

    return (
        <div className="join">
            {roles.map((r) => (
                <button
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={`join-item btn ${
                        role === r.value
                            ? 'bg-[#34495e] hover:bg-[#2c3e50] text-white border-[#34495e]'
                            : 'btn-ghost'
                    }`}
                >
                    {r.label}
                </button>
            ))}
        </div>
    )
}
