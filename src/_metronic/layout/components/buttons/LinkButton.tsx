import React from 'react'
import { Link } from 'react-router-dom'

interface LinkButton {
    to: string
    title?: string
    style?: React.CSSProperties
    className?: string
}

const LinkButton: React.FC<LinkButton> = ({ to, style, className, title }) => {
    return (
        <Link
            to={to}
            className={`position-absolute btn btn-primary btn-md ${className}`}
            style={{
                right: '0px',
                fontSize: '14px',
                borderRadius: '8px',
                ...style,
            }}
        >
            {title}
        </Link>
    )
}

export default LinkButton
