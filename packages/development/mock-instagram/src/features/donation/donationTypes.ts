export type DonationStep =
  | 'age-consent'
  | 'blocked'
  | 'amount'
  | 'webview'
  | 'processing'
  | 'success'
  | 'failed';

export type PaymentMethod = 'card' | 'wallet';

export type SimOutcome = 'success' | 'failure';
