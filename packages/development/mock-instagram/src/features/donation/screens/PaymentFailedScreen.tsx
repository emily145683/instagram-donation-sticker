interface Props {
  onRetry: () => void;
  onCancel: () => void;
}

export default function PaymentFailedScreen({ onRetry, onCancel }: Props) {
  return (
    <div className="donation-screen donation-screen--failed">
      <div className="donation-failed-icon">✕</div>
      <h2>Payment Failed</h2>
      <p>Something went wrong processing your payment.</p>
      <div className="donation-actions">
        <button className="donation-btn donation-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button className="donation-btn donation-btn--primary" onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  );
}
