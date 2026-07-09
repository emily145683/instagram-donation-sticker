import { useState } from 'react';

interface Props {
  onVerified: () => void;
  onBlocked: () => void;
}

export default function AgeConsentScreen({ onVerified, onBlocked }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="donation-screen donation-screen--consent">
      <h2>Before You Donate</h2>
      <label className="donation-checkbox">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        <span>I confirm I&apos;m 18 or over and agree to the Terms &amp; Conditions</span>
      </label>

      <div className="donation-actions">
        <button className="donation-btn donation-btn--ghost" onClick={onBlocked}>
          Not right now
        </button>
        <button className="donation-btn donation-btn--primary" disabled={!agreed} onClick={onVerified}>
          Continue
        </button>
      </div>
    </div>
  );
}

