export const STATUSES = ['new', 'in progress', 'done']

export const FILTER_OPTIONS = [
    { value: 'all', labelKey: 'status.all' },
    { value: 'new', labelKey: 'status.new' },
    { value: 'in progress', labelKey: 'status.in progress' },
    { value: 'done', labelKey: 'status.done' },
]

export const NEXT_STATUS = {
    new: 'in progress',
    'in progress': 'done',
}

export const NEXT_STATUS_LABEL = {
    new: 'nextStatus.new',
    'in progress': 'nextStatus.in progress',
}

export const SORT_OPTIONS = [
    { value: 'newest', labelKey: 'sort.newest' },
    { value: 'oldest', labelKey: 'sort.oldest' },
]