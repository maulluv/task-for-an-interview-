import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRequestStore } from '@/store/useRequestStore'
import { RequestForm } from '@/features/requests/RequestForm'
import { RequestList } from '@/features/requests/RequestList'
import { sortRequests } from '@/utils/sortRequests'
import { SORT_OPTIONS } from '@/constants'
import { Button } from '@/ui/Button'
import { Select } from '@/ui/Select'
import { ConfirmModal } from '@/ui/Modal'
import { translateOptions } from '@/utils/translateOptions'

export const UserView = () => {
    const { t } = useTranslation()
    const sortOptions = translateOptions(SORT_OPTIONS, t)

    const requests = useRequestStore((s) => s.requests)
    const deleteRequest = useRequestStore((s) => s.deleteRequest)

    const [editingRequest, setEditingRequest] = useState(null)
    const [deletingRequest, setDeletingRequest] = useState(null)
    const [sort, setSort] = useState('newest')

    const visibleRequests = sortRequests(requests, sort)

    const confirmDelete = () => {
        if (deletingRequest) {
            deleteRequest(deletingRequest.id)
            setDeletingRequest(null)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <RequestForm
                key={editingRequest?.id ?? 'new'}
                editingRequest={editingRequest}
                onDone={() => setEditingRequest(null)}
            />

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold">
                        {t('userView.title')}
                    </h2>
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        options={sortOptions}
                    />
                </div>

                <RequestList
                    requests={visibleRequests}
                    renderActions={(req) => (
                        <>
                            {req.status === 'new' && (
                                <Button
                                    variant="warning"
                                    onClick={() => setEditingRequest(req)}
                                >
                                    {t('userView.edit')}
                                </Button>
                            )}
                            <Button
                                variant="error"
                                onClick={() => setDeletingRequest(req)}
                            >
                                {t('userView.delete')}
                            </Button>
                        </>
                    )}
                />
            </div>

            <ConfirmModal
                open={!!deletingRequest}
                title={t('userView.deleteModalTitle')}
                message={
                    deletingRequest
                        ? t('userView.deleteModalMessage', { title: deletingRequest.title })
                        : ''
                }
                confirmText={t('userView.delete')}
                cancelText={t('common.cancel')}
                onConfirm={confirmDelete}
                onCancel={() => setDeletingRequest(null)}
/>
        </div>
    )
}