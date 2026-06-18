import { useTranslation } from 'react-i18next'
import { useLogStore } from '@/store/useLogStore'
import { useRequestStore } from '@/store/useRequestStore'
import { Button } from '@/ui/Button'
import { formatDateTime } from '@/utils/date'

const ROLE_LABEL = {
    user: 'logs.roleUser',
    manager: 'logs.roleManager',
}

export const LogsView = () => {
    const { t } = useTranslation()
    const logs = useLogStore((s) => s.logs)
    const clearLogs = useLogStore((s) => s.clearLogs)
    const setView = useRequestStore((s) => s.setView)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" onClick={() => setView('main')}>
                        ← {t('nav.requests')}
                    </Button>
                    <h2 className="text-xl font-semibold">{t('logs.title')}</h2>
                </div>
                {logs.length > 0 && (
                    <Button variant="error" onClick={clearLogs}>
                        {t('logs.clear')}
                    </Button>
                )}
            </div>

            {logs.length === 0 ? (
                <p className="text-base-content/60">{t('logs.empty')}</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {logs.map((entry) => (
                        <li
                            key={entry.id}
                            className="flex items-center justify-between gap-3 bg-base-100 px-4 py-3 rounded-xl shadow-sm"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{entry.action}</span>
                                <span className="text-xs text-base-content/60">
                                    {t(ROLE_LABEL[entry.role])}
                                </span>
                            </div>
                            <span className="text-xs text-base-content/60 whitespace-nowrap">
                                {formatDateTime(entry.timestamp).toLocaleString()}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}