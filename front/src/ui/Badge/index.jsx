import { useTranslation } from 'react-i18next'

const STATUS_STYLES = {
    new: 'badge-neutral',
    'in progress': 'badge-warning',
    done: 'badge-success',
}

export const Badge = ({ status }) => {
    const { t } = useTranslation()

    return (
        <span
            className={`badge whitespace-nowrap shrink-0 ${STATUS_STYLES[status] ?? ''}`}
        >
            {t(`status.${status}`)}
        </span>
    )
}