import { useState } from 'react';

interface Props {
  onVerified: () => void;
  onBlocked: () => void;
}

export default function AgeConsentScreen({ onVerified, onBlocked }: Props) {
  const [age, setAge] = useState('');
  const [consentRequested, setConsentRequested] = useState(false);
  const [consentGranted, setConsentGranted] = useState(false);

  const parsedAge = age ? Number(age) : null;
  const needsConsent = parsedAge !== null && parsedAge < 18;
  const canContinue = parsedAge !== null && (!needsConsent || consentGranted);

  return (
    <div className="donation-screen donation-screen--consent">
      <h2>Confirm Your Age</h2>
      <label className="donation-field">
        Enter age
        <input
          type="number"
          min={0}
          max={120}
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setConsentGranted(false);
            setConsentRequested(false);
          }}
        />
      </label>

      {needsConsent && (
        <div className="donation-consent-block">
          <p>You&apos;re under 18 — a parent or guardian needs to approve donations.</p>
          {!consentGranted ? (
            <button
              className="donation-btn donation-btn--secondary"
              onClick={() => {
                setConsentRequested(true);
                window.setTimeout(() => setConsentGranted(true), 800);
              }}
              disabled={consentRequested}
            >
              {consentRequested ? 'Waiting for approval… (simulated)' : 'Send Consent Request'}
            </button>
          ) : (
            <p className="donation-consent-approved">✓ Parental consent granted</p>
          )}
        </div>
      )}

      <div className="donation-actions">
        <button className="donation-btn donation-btn--ghost" onClick={onBlocked}>
          Not right now
        </button>
        <button className="donation-btn donation-btn--primary" disabled={!canContinue} onClick={onVerified}>
          Continue
        </button>
      </div>
    </div>
  );
}
