export const STATUSES = ['new', 'in progress', 'done']

export const FILTER_OPTIONS = [
    { value: 'all', label: 'Всі' },
    { value: 'new', label: 'New' },
    { value: 'in progress', label: 'In progress' },
    { value: 'done', label: 'Done' },
]

export const NEXT_STATUS = {
    new: 'in progress',
    'in progress': 'done',
}

export const NEXT_STATUS_LABEL = {
    new: 'Взяти в роботу',
    'in progress': 'Завершити',
}

export const SORT_OPTIONS = [
    { value: 'newest', label: 'Новіші' },
    { value: 'oldest', label: 'Старіші' },
]