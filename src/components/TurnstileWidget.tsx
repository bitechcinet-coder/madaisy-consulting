'use client';
import Turnstile from 'react-turnstile';

export default function TurnstileWidget({ onVerify }: { onVerify: (token: string) => void }) {
  return (
    <Turnstile
      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAD_23zRui3sA6kp5"}
      onVerify={onVerify}
      theme="light"
    />
  );
}
