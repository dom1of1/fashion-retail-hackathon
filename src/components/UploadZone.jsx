import { useRef, useState, useCallback } from 'react';
import { fileToBase64, validateImage } from '../utils/imageUtils';

/**
 * Reusable drag-and-drop / click-to-browse upload zone.
 *
 * Props:
 *  - icon: JSX element for the icon
 *  - label: string – main label text
 *  - subtext: string – supporting text
 *  - aspectRatio: 'portrait' | 'square' – preview crop ratio
 *  - onImageSelect: (base64: string) => void
 *  - value: string | null – current base64 image (for controlled preview)
 */
export default function UploadZone({
  icon,
  label,
  subtext,
  aspectRatio = 'portrait',
  onImageSelect,
  value,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = useCallback(
    async (file) => {
      setError(null);
      const validation = validateImage(file);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
      try {
        const base64 = await fileToBase64(file);
        onImageSelect(base64);
      } catch {
        setError('Failed to read the image. Please try another file.');
      }
    },
    [onImageSelect]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so user can re-select same file
    e.target.value = '';
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleReselect = (e) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  // Show preview if image is selected
  if (value) {
    return (
      <div className="preview">
        <img
          src={value}
          alt="Selected"
          className={`preview__image preview__image--${aspectRatio}`}
        />
        <button
          type="button"
          className="preview__change"
          onClick={handleReselect}
        >
          Change
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="upload-zone__input"
          onChange={handleInputChange}
        />
      </div>
    );
  }

  return (
    <div
      className={`upload-zone${dragging ? ' upload-zone--dragging' : ''}${error ? ' upload-zone--error' : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <div className="upload-zone__icon">{icon}</div>
      <p className="upload-zone__label">{label}</p>
      <p className="upload-zone__subtext">{subtext}</p>
      {error && <p className="upload-zone__error">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="upload-zone__input"
        onChange={handleInputChange}
      />
    </div>
  );
}
