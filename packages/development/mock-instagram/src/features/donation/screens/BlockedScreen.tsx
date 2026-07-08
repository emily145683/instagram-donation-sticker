interface Props {
  onClose: () => void;
}

export default function BlockedScreen({ onClose }: Props) {
  return (
    <div className="donation-screen donation-screen--blocked">
      <h2>Donation Not Available</h2>
      <p>We couldn&apos;t verify your age or parental consent, so donating isn&apos;t available right now.</p>
      <button className="donation-btn donation-btn--primary" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
