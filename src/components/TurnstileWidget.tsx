'use client';
import Turnstile from 'react-turnstile';

export default function TurnstileWidget({ onVerify }: { onVerify: (token: string) => void }) {
  return (
    <Turnstile
      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
      onVerify={onVerify}
      theme="light"
    />
  );
}
