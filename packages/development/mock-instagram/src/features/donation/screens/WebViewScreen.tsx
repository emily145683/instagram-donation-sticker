import type { Charity } from '../../../types';

interface Props {
  charity: Charity;
  onBack: () => void;
}

export default function WebViewScreen({ charity, onBack }: Props) {
  return (
    <div className="donation-screen donation-screen--webview">
      <div className="donation-webview__topbar">
        <button className="donation-btn donation-btn--ghost" onClick={onBack}>
          ‹ Back
        </button>
        <span className="donation-webview__address">{new URL(charity.websiteUrl).hostname}</span>
      </div>
      <div className="donation-webview__content">
        <h2>{charity.name}</h2>
        <p>{charity.fact}</p>
        <p>This is a mock in-app web view standing in for the charity&apos;s real website.</p>
      </div>
    </div>
  );
}
