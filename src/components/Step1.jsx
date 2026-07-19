import UploadZone from './UploadZone';

/**
 * Step 1 — Upload user photo.
 * Props:
 *  - userImage: string | null
 *  - onImageSelect: (base64: string) => void
 *  - onNext: () => void
 */
export default function Step1({ userImage, onImageSelect, onNext }) {
  return (
    <div className="step-enter step-active">
      <h1 className="step-heading">Upload your photo</h1>
      <p className="step-subheading">
        A clear, full-body photo works best for accurate results.
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
            <rect x="8" y="6" width="32" height="36" rx="4" />
            <circle cx="24" cy="18" r="6" />
            <path d="M12 42c0-6.627 5.373-12 12-12s12 5.373 12 12" />
          </svg>
        }
        label="Upload your photo"
        subtext="Full body photo works best"
        aspectRatio="portrait"
        onImageSelect={onImageSelect}
        value={userImage}
      />

      <div className="btn-group">
        <button
          type="button"
          className="btn btn--primary"
          disabled={!userImage}
          onClick={onNext}
          id="step1-next"
        >
          Next
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
      </div>
    </div>
  );
}
