'use client';

import { CommunityPage } from '@/components/community/community-page';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CommunityContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  
  const prefilledReport = url ? {
    title: 'Threat Warning',
    url: url,
    rating: 10,
    comment: 'Flagged as malicious by Sentinel Scan.'
  } : null;

  return <CommunityPage prefilledReport={prefilledReport} />;
}

export default function CommunityRoute() {
  return (
    <Suspense fallback={<div>Loading community...</div>}>
      <CommunityContent />
    </Suspense>
  );
}
