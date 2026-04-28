import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BPB Strategy Codex',
  description: 'Backpack Battles strategy wiki — items, characters, status effects, and builds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
