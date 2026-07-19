/**
 * Step 3 — Final result viewer.
 * Props:
 *  - resultImage: string – URL or base64 of the AI-generated result
 *  - onTryAnother: () => void – go back to Step 2 with same selfie
 *  - onStartOver: () => void – reset to Step 1
 */
export default function Step3({ resultImage, onTryAnother, onStartOver }) {
  return (
    <div className="step-enter step-active">
      <h1 className="step-heading">Your Look</h1>
      <p className="step-subheading">
        Here is your virtual try-on result.
      </p>

      <div className="viewer" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="preview" style={{ maxWidth: '400px', width: '100%', aspectRatio: '3/4' }}>
          <img
            src={resultImage}
            alt="Virtual Try-On Result"
            className="preview__image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="btn-group">
        <div className="btn-row">
          <button
            type="button"
            className="btn btn--primary"
            onClick={onTryAnother}
            id="step3-try-another"
          >
            Try Another Item
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onStartOver}
            id="step3-start-over"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
