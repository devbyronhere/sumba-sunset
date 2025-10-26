'use client';

import { AlertCircle } from 'lucide-react';

export function PreLaunchBanner() {
  const isPreLaunch = process.env.NEXT_PUBLIC_PRE_LAUNCH === 'true';

  if (!isPreLaunch) {
    return null;
  }

  return (
    <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-sm text-yellow-800">
        <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
        <p className="font-medium">
          We&apos;re not quite ready yet! Site launching soon.
        </p>
      </div>
    </div>
  );
}
