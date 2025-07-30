'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to legal page with privacy tab
    router.replace('/legal?tab=privacy');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Redirecting...</h1>
        <p className="text-muted-foreground">Taking you to our Privacy Policy</p>
      </div>
    </div>
  );
}