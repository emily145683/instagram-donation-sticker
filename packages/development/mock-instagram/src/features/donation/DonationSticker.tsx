import { useState } from 'react';
import type { Charity } from '../../types';
import type { DonationStep, PaymentMethod, SimOutcome } from './donationTypes';
import AgeConsentScreen from './screens/AgeConsentScreen';
import BlockedScreen from './screens/BlockedScreen';
import AmountScreen from './screens/AmountScreen';
import WebViewScreen from './screens/WebViewScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import PaymentFailedScreen from './screens/PaymentFailedScreen';
import SuccessScreen from './screens/SuccessScreen';
import './DonationSticker.css';

interface DonationStickerProps {
  charity: Charity;
  ageVerified: boolean;
  onAgeVerified: () => void;
}

export default function DonationSticker({ charity, ageVerified, onAgeVerified }: DonationStickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<DonationStep>('amount');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [simOutcome, setSimOutcome] = useState<SimOutcome>('success');

  const amount = selectedAmount ?? (customAmount ? Number(customAmount) : null);

  const openFlow = () => {
    setIsOpen(true);
    setStep(ageVerified ? 'amount' : 'age-consent');
  };

  const closeFlow = () => {
    setIsOpen(false);
    setStep(ageVerified ? 'amount' : 'age-consent');
    setSelectedAmount(null);
    setCustomAmount('');
    setPaymentMethod(null);
  };

  const handlePay = () => {
    setStep('processing');
    window.setTimeout(() => {
      setStep(simOutcome === 'success' ? 'success' : 'failed');
    }, 1200);
  };

  return (
    <>
      <button className="donation-sticker" onClick={openFlow}>
        <span className="donation-sticker__logo">{charity.emoji}</span>
        <span className="donation-sticker__name">{charity.name}</span>
        <span className="donation-sticker__cta">Can you match me?</span>
      </button>

      {isOpen && (
        <div className="donation-overlay" role="dialog" aria-modal="true">
          {step === 'age-consent' && (
            <AgeConsentScreen
              onVerified={() => {
                onAgeVerified();
                setStep('amount');
              }}
              onBlocked={() => setStep('blocked')}
            />
          )}

          {step === 'blocked' && <BlockedScreen onClose={closeFlow} />}

          {step === 'amount' && (
            <AmountScreen
              charity={charity}
              selectedAmount={selectedAmount}
              customAmount={customAmount}
              paymentMethod={paymentMethod}
              simOutcome={simOutcome}
              amount={amount}
              onSelectAmount={(a) => {
                setSelectedAmount(a);
                setCustomAmount('');
              }}
              onCustomAmountChange={(v) => {
                setCustomAmount(v);
                setSelectedAmount(null);
              }}
              onSelectPaymentMethod={setPaymentMethod}
              onSimOutcomeChange={setSimOutcome}
              onLearnMore={() => setStep('webview')}
              onPay={handlePay}
            />
          )}

          {step === 'webview' && <WebViewScreen charity={charity} onBack={() => setStep('amount')} />}

          {step === 'processing' && <ProcessingScreen />}

          {step === 'failed' && (
            <PaymentFailedScreen
              onRetry={() => setStep('amount')}
              onCancel={() => {
                setSelectedAmount(null);
                setCustomAmount('');
                setStep('amount');
              }}
            />
          )}

          {step === 'success' && <SuccessScreen charity={charity} amount={amount ?? 0} onClose={closeFlow} />}
        </div>
      )}
    </>
  );
}
