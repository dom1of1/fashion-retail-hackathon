/**
 * 3-step progress indicator.
 * Props:
 *  - currentStep: 1 | 2 | 3
 */
export default function StepIndicator({ currentStep }) {
  const steps = [
    { number: 1, label: 'Your Photo' },
    { number: 2, label: 'Clothing' },
    { number: 3, label: 'Your Look' },
  ];

  return (
    <div className="step-indicator" role="navigation" aria-label="Progress">
      {steps.map((step, i) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;

        return (
          <div key={step.number} className="step-indicator__step">
            {i > 0 && (
              <div
                className={`step-indicator__connector${
                  step.number <= currentStep
                    ? ' step-indicator__connector--completed'
                    : ''
                }`}
              />
            )}
            <div
              className={`step-indicator__circle${
                isActive ? ' step-indicator__circle--active' : ''
              }${isCompleted ? ' step-indicator__circle--completed' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {isCompleted ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="2.5,7 5.5,10 11.5,4" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`step-indicator__label${
                isActive ? ' step-indicator__label--active' : ''
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
