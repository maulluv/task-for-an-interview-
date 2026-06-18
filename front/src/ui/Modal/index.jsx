import { Button } from '@/ui/Button'

export const ConfirmModal = ({
    open,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onCancel}
        >
            <div
                className="w-full max-w-sm rounded-2xl bg-base-100 p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h3 className="text-lg font-semibold">{title}</h3>}

                {message && (
                    <p className="mt-2 text-sm text-base-content/70">
                        {message}
                    </p>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button variant="error" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    )
}