'use client';

import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';

export default function Home() {
  const handleTestError = () => {
    Sentry.startSpan(
      {
        op: 'ui.click',
        name: 'Test Error Button Click',
      },
      () => {
        // Add attributes for debugging
        Sentry.setContext('test_context', {
          button: 'test-error',
          location: 'homepage',
        });

        // Trigger a test error
        throw new Error('Sentry Test Error - Frontend');
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="mb-4 text-6xl font-bold">Sumba Sunset</h1>
        <p className="mb-6 text-2xl text-gray-600 dark:text-gray-400">
          Coming Soon
        </p>
        <Button
          onClick={handleTestError}
          variant="destructive"
          className="mt-4"
        >
          Test Sentry Error
        </Button>
      </main>
    </div>
  );
}
