const styles = {
    primary: 'btn-primary text-primary-content',
    green: 'btn-success text-primary-content',
    warning: 'btn-warning text-primary-content',
    neutral: 'btn-neutral',
    error: 'btn-error text-error-content',
    ghost: 'btn-ghost',
}

export const Button = ({
    children,
    variant = 'primary',
    type = 'button',
    onClick,
    disabled,
    className = '',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn rounded-xl ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    )
}
