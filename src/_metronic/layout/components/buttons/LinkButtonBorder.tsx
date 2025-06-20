import React from 'react'
import { Link } from 'react-router-dom'

interface LinkButtonBorder {
    to: string
    title?: string
    style?: React.CSSProperties
    className?: string
}

const LinkButtonBorder: React.FC<LinkButtonBorder> = ({ to, style, className, title }) => {
    return (
        <Link
            to={to}
            className={`position-absolute btn btn-white border border-2 border-primary text-primary btn-md ${className}`}
            style={{
                right: '0px',
                fontSize: '14px',
                borderRadius: '8px',
                padding: '8px 32px',
                ...style,
            }}
        >
            {title}
        </Link>
    )
}

export default LinkButtonBorder
