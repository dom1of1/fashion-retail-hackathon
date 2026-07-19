import UploadZone from './UploadZone';

const CATEGORIES = [
  { value: 'upper_body', label: 'Tops' },
  { value: 'lower_body', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
];

/**
 * Step 2 — Upload clothing image and trigger try-on.
 * Props:
 *  - clothImage: string | null
 *  - onImageSelect: (base64: string) => void
 *  - category: string
 *  - onCategoryChange: (category: string) => void
 *  - onGenerate: () => void
 *  - onBack: () => void
 */
export default function Step2({
  clothImage,
  onImageSelect,
  category,
  onCategoryChange,
  onGenerate,
  onBack,
}) {
  return (
    <div className="step-enter step-active">
      <h1 className="step-heading">Choose a clothing item</h1>
      <p className="step-subheading">
        Upload a product image of the clothing you want to try on.
      </p>

      <UploadZone
        icon={
          <svg
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 6l-10 8 4 4 6-4v28h16V14l6 4 4-4-10-8" />
            <path d="M20 6a4 4 0 008 0" />
          </svg>
        }
        label="Upload clothing item"
        subtext="Works with shirts, trousers, dresses, jackets"
        aspectRatio="square"
        onImageSelect={onImageSelect}
        value={clothImage}
      />

      <div className="category-selector" role="radiogroup" aria-label="Garment category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={`category-selector__option${category === cat.value ? ' category-selector__option--active' : ''}`}
            onClick={() => onCategoryChange(cat.value)}
            role="radio"
            aria-checked={category === cat.value}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn btn--primary"
          disabled={!clothImage}
          onClick={onGenerate}
          id="step2-generate"
        >
          Generate Try-On
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={onBack}
          id="step2-back"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 3l-5 5 5 5" />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}

