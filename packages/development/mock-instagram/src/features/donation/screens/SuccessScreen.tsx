import type { Charity } from '../../../types';

interface Props {
  charity: Charity;
  amount: number;
  onClose: () => void;
}

export default function SuccessScreen({ charity, amount, onClose }: Props) {
  const totalToday = charity.totalDonatedTodayGBP + amount;
  const othersToday = charity.othersDonatedToday;

  return (
    <div className="donation-screen donation-screen--success">
      <button className="donation-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <h2>Success</h2>
      <p className="donation-success__welcome">Welcome to the {charity.name} community</p>
      <div className="donation-success__card">
        <p>
          You and {othersToday} others have donated £{totalToday} today
        </p>
      </div>
    </div>
  );
}
