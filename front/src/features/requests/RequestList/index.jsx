import { useTranslation } from 'react-i18next'
import { RequestCard } from '@/features/requests/RequestCard'

export const RequestList = ({ requests, showId, renderActions }) => {
    const { t } = useTranslation()

    if (requests.length === 0) {
        return (
            <p className="text-neutral text-center py-8">
                {t('requestList.empty')}
            </p>
        )
    }

    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {requests.map((req) => (
                <RequestCard key={req.id} request={req} showId={showId}>
                    {renderActions?.(req)}
                </RequestCard>
            ))}
        </div>
    )
}