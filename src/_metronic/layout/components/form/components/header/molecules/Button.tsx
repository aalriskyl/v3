import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
    return (
        <button type="button" className={`btn ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
