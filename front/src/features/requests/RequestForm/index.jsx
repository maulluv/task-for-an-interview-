import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRequestStore } from '@/store/useRequestStore'
import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import { Button } from '@/ui/Button'

export const RequestForm = ({ editingRequest, onDone }) => {
    const { t } = useTranslation()

    const addRequest = useRequestStore((s) => s.addRequest)
    const updateRequest = useRequestStore((s) => s.updateRequest)

    const [title, setTitle] = useState(editingRequest?.title ?? '')
    const [description, setDescription] = useState(
        editingRequest?.description ?? ''
    )
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim() || !description.trim()) {
            setError(t('requestForm.errorRequired'))
            return
        }

        if (editingRequest) {
            updateRequest(editingRequest.id, { title, description })
            onDone?.()
        } else {
            addRequest(title, description)
        }

        setTitle('')
        setDescription('')
        setError('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 bg-base-100 p-5 rounded-2xl shadow-sm"
        >
            <h3 className="text-lg font-semibold">
                {editingRequest
                    ? t('requestForm.editTitle')
                    : t('requestForm.newTitle')}
            </h3>

            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('requestForm.titlePlaceholder')}
            />

            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('requestForm.descPlaceholder')}
            />

            {error && <p className="text-error text-sm">{error}</p>}

            <div className="flex gap-2">
                <Button type="submit" variant="green">
                    {editingRequest
                        ? t('requestForm.save')
                        : t('requestForm.create')}
                </Button>
                {editingRequest && (
                    <Button variant="ghost" onClick={onDone}>
                        {t('requestForm.cancel')}
                    </Button>
                )}
            </div>
        </form>
    )
}