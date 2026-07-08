import type { Charity } from '../../../types';
import type { PaymentMethod, SimOutcome } from '../donationTypes';

const PRESET_AMOUNTS = [3, 5, 10];

interface Props {
  charity: Charity;
  selectedAmount: number | null;
  customAmount: string;
  paymentMethod: PaymentMethod | null;
  simOutcome: SimOutcome;
  amount: number | null;
  onSelectAmount: (amount: number) => void;
  onCustomAmountChange: (value: string) => void;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onSimOutcomeChange: (outcome: SimOutcome) => void;
  onLearnMore: () => void;
  onPay: () => void;
}

export default function AmountScreen({
  charity,
  selectedAmount,
  customAmount,
  paymentMethod,
  simOutcome,
  amount,
  onSelectAmount,
  onCustomAmountChange,
  onSelectPaymentMethod,
  onSimOutcomeChange,
  onLearnMore,
  onPay,
}: Props) {
  const canPay = !!amount && amount > 0 && !!paymentMethod;

  return (
    <div className="donation-screen donation-screen--amount">
      <header className="donation-screen__header">
        <span className="donation-screen__logo">{charity.emoji}</span>
        <h2>{charity.name}</h2>
      </header>

      <p className="donation-fact">{charity.fact}</p>
      <button className="donation-link" onClick={onLearnMore}>
        ℹ️ Learn more about {charity.name}
      </button>

      <div className="donation-amounts">
        {PRESET_AMOUNTS.map((value) => (
          <button
            key={value}
            className={`donation-amount-btn ${selectedAmount === value ? 'is-selected' : ''}`}
            onClick={() => onSelectAmount(value)}
          >
            £{value}
          </button>
        ))}
        <div className={`donation-amount-btn donation-amount-btn--custom ${customAmount ? 'is-selected' : ''}`}>
          <span>£</span>
          <input
            type="number"
            min={1}
            placeholder="Custom"
            value={customAmount}
            onChange={(e) => onCustomAmountChange(e.target.value)}
          />
        </div>
      </div>

      <div className="donation-payment-methods">
        <button
          className={`donation-payment-btn ${paymentMethod === 'card' ? 'is-selected' : ''}`}
          onClick={() => onSelectPaymentMethod('card')}
        >
          💳 Card
        </button>
        <button
          className={`donation-payment-btn ${paymentMethod === 'wallet' ? 'is-selected' : ''}`}
          onClick={() => onSelectPaymentMethod('wallet')}
        >
          📱 Apple / Google Pay
        </button>
      </div>

      <div className="donation-dev-controls">
        <span>Dev: simulate outcome</span>
        <div className="donation-dev-toggle">
          <button
            className={simOutcome === 'success' ? 'is-active' : ''}
            onClick={() => onSimOutcomeChange('success')}
          >
            Success
          </button>
          <button
            className={simOutcome === 'failure' ? 'is-active' : ''}
            onClick={() => onSimOutcomeChange('failure')}
          >
            Failure
          </button>
        </div>
      </div>

      <button className="donation-btn donation-btn--primary donation-btn--full" disabled={!canPay} onClick={onPay}>
        Pay {amount ? `£${amount}` : 'Now'}
      </button>
    </div>
  );
}
