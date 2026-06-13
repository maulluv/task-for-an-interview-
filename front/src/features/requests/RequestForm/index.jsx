import { useState } from 'react'
import { useRequestStore } from '@/store/useRequestStore'
import { Input } from '@/ui/Input'
import { Textarea } from '@/ui/Textarea'
import { Button } from '@/ui/Button'

export const RequestForm = ({ editingRequest, onDone }) => {
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
            setError('Заповніть обидва поля')
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
                {editingRequest ? 'Редагувати заявку' : 'Нова заявка'}
            </h3>

            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Назва заявки"
            />

            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Текст заявки"
            />

            {error && <p className="text-error text-sm">{error}</p>}

            <div className="flex gap-2">
                <Button
                    type="submit"
                    variant="green"
                >
                    {editingRequest ? 'Зберегти' : 'Створити'}
                </Button>
                {editingRequest && (
                    <Button variant="ghost" onClick={onDone}>
                        Скасувати
                    </Button>
                )}
            </div>
        </form>
    )
}
