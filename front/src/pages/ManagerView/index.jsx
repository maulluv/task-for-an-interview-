import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRequestStore } from '@/store/useRequestStore'
import { RequestList } from '@/features/requests/RequestList'
import {
    FILTER_OPTIONS,
    SORT_OPTIONS,
    NEXT_STATUS,
    NEXT_STATUS_LABEL,
} from '@/constants/index.js'
import { translateOptions } from '@/utils/translateOptions'
import { sortRequests } from '@/utils/sortRequests'
import { Select } from '@/ui/Select'
import { Button } from '@/ui/Button'

export const ManagerView = () => {
    const { t } = useTranslation()

    const requests = useRequestStore((s) => s.requests)
    const changeStatus = useRequestStore((s) => s.changeStatus)
    const setView = useRequestStore((s) => s.setView)

    const [filter, setFilter] = useState('all')
    const [sort, setSort] = useState('newest')

    const filterOptions = translateOptions(FILTER_OPTIONS, t)
    const sortOptions = translateOptions(SORT_OPTIONS, t)

    const filtered =
        filter === 'all'
            ? requests
            : requests.filter((req) => req.status === filter)

    const visibleRequests = sortRequests(filtered, sort)

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">
                        {t('managerView.title')}
                    </h2>
                    <Button variant="ghost" onClick={() => setView('logs')}>
                        {t('nav.logs')}
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        options={filterOptions}
                        className="min-w-40"
                    />
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        options={sortOptions}
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
                            {t(NEXT_STATUS_LABEL[req.status])}
                        </Button>
                    )
                }
            />
        </div>
    )
}