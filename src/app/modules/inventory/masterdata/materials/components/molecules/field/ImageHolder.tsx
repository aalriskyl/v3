import React, { FC } from 'react';

interface ImageHolderProps {
    label?: string;
    imageUrl: string;
    placeholder?: string;
    className?: string;
    altText?: string;
    onClick?: () => void;
}

const ImageHolder: FC<ImageHolderProps> = ({
    label,
    imageUrl,
    placeholder = 'No image available',
    className = '',
    altText = 'Image preview',
    onClick,
}) => {
    return (
        <div className={`image-field ${className}`}>
            {label && <label className="mb-2 fw-bold">{label}</label>}
            <div
                style={{ cursor: onClick ? 'pointer' : 'default' }}
                onClick={onClick}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={altText}
                        className="rounded border"
                        style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                    />
                ) : (
                    <p className="text-muted">{placeholder}</p>
                )}
            </div>
        </div>
    );
};

export default ImageHolder;