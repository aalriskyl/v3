import { FC, useEffect, useRef, useState } from "react";
import ImageUpload from "/media/logos/image-input.png?url";

interface ImageFieldProps {
  name: string;
  label: string;
  onChange: (file: File | null) => void;
  errors?: string | null;
  defaultValue?: string | null; // For pre-filled image URL (e.g., in edit mode)
  isRequired?: boolean; // New prop to indicate if the field is required
}

const ImageField: FC<ImageFieldProps> = ({
  label,
  onChange,
  errors,
  defaultValue,
  isRequired = false,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [hasUserInteraction, setHasUserInteraction] = useState(false);

  const handleFileChange = (file: File | null) => {
    setHasUserInteraction(true);
    if (file) {
      // Validate file type and size
      const validTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/tiff",
        "image/tif",
      ];
      const maxSize = 15 * 1024 * 1024; // 15MB

      if (!validTypes.includes(file.type)) {
        alert(
          "Format file tidak valid. Harap unggah file dengan format gambar yang valid."
        );
        return;
      }

      if (file.size > maxSize) {
        alert("Ukuran file terlalu besar. Maksimal file 15MB.");
        return;
      }

      setPreview(URL.createObjectURL(file));
      onChange(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  const handleDrag = (e: React.DragEvent, isEnter: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEnter);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    setHasUserInteraction(true);
    setPreview(null);
    onChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  useEffect(() => {
    // Only update preview if defaultValue changes and user hasn't interacted with the field
    if (defaultValue && !hasUserInteraction) {
      setPreview(defaultValue);
    }
  }, [defaultValue, hasUserInteraction]);

  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
        {isRequired && <span className="text-danger"> *</span>}
      </label>
      <div
        className={`dropzone d-flex form-control align-items-center justify-content-center p-12 ${
          isDragging ? "dropzone-dragover" : ""
        }`}
        style={{ minHeight: "200px", cursor: "pointer" }}
        onDragEnter={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDragOver={(e) => handleDrag(e, true)}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        aria-label="Upload image"
      >
        {preview ? (
          <div className="position-relative">
            <img
              src={preview}
              alt="Preview"
              style={{ maxHeight: "180px", width: "auto" }}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm position-absolute top-0 end-0 mt-2 me-2"
              onClick={handleRemoveFile}
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="text-center d-flex flex-column align-items-center justify-content-center">
            <img
              src={ImageUpload}
              alt="Placeholder"
              style={{ maxHeight: "180px", width: "auto" }}
            />
            <span className="fs-6 fw-normal text-gray-500">
              Unggah file dengan format jpg, jpeg, png, gif, bmp, tiff, tif.
              Maksimal file 15MB.
            </span>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp,image/tiff,image/tif"
        onChange={handleInputChange}
      />
      {errors && <div className="invalid-feedback d-block">{errors}</div>}
    </div>
  );
};

export default ImageField;
