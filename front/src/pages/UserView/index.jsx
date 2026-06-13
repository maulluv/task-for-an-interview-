import { useState } from 'react'
import { useRequestStore } from '@/store/useRequestStore'
import { RequestForm } from '@/features/requests/RequestForm'
import { RequestList } from '@/features/requests/RequestList'
import { sortRequests } from '@/utils/sortRequests'
import { SORT_OPTIONS } from '@/constants'
import { Button } from '@/ui/Button'
import { Select } from '@/ui/Select'

export const UserView = () => {
    const requests = useRequestStore((s) => s.requests)
    const deleteRequest = useRequestStore((s) => s.deleteRequest)

    const [editingRequest, setEditingRequest] = useState(null)
    const [sort, setSort] = useState('newest')

    const visibleRequests = sortRequests(requests, sort)

    return (
        <div className="flex flex-col gap-6">
            <RequestForm
                key={editingRequest?.id ?? 'new'}
                editingRequest={editingRequest}
                onDone={() => setEditingRequest(null)}
            />

            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold">Мої заявки</h2>
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        options={SORT_OPTIONS}
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
                                    Редагувати
                                </Button>
                            )}
                            <Button
                                variant="error"
                                onClick={() => deleteRequest(req.id)}
                            >
                                Видалити
                            </Button>
                        </>
                    )}
                />
            </div>
        </div>
    )
}
