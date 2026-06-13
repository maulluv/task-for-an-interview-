import { useState } from 'react'
import { useRequestStore } from '@/store/useRequestStore'
import { RequestList } from '@/features/requests/RequestList'
import {
    FILTER_OPTIONS,
    SORT_OPTIONS,
    NEXT_STATUS,
    NEXT_STATUS_LABEL,
} from '@/constants/index.js'
import { sortRequests } from '@/utils/sortRequests'
import { Select } from '@/ui/Select'
import { Button } from '@/ui/Button'

export const ManagerView = () => {
    const requests = useRequestStore((s) => s.requests)
    const changeStatus = useRequestStore((s) => s.changeStatus)

    const [filter, setFilter] = useState('all')
    const [sort, setSort] = useState('newest')

    const filtered =
        filter === 'all'
            ? requests
            : requests.filter((req) => req.status === filter)

    const visibleRequests = sortRequests(filtered, sort)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">Усі заявки</h2>
                <div className="flex gap-2">
                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        options={FILTER_OPTIONS}
                        className="min-w-40"
                    />
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        options={SORT_OPTIONS}
                    />
                </div>
            </div>

            <RequestList
                requests={visibleRequests}
                showId
                renderActions={(req) =>
                    NEXT_STATUS[req.status] && (
                        <Button
                            variant="green"
                            onClick={() =>
                                changeStatus(req.id, NEXT_STATUS[req.status])
                            }
                        >
                            {NEXT_STATUS_LABEL[req.status]}
                        </Button>
                    )
                }
            />
        </div>
    )
}
