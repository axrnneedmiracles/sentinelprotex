'use client';

import { MoreOptionsPage } from '@/components/options/more-options-page';
import { useRouter } from 'next/navigation';

export default function MoreOptionsRoute() {
  const router = useRouter();
  return <MoreOptionsPage onOptionClick={(id) => router.push(`/${id}`)} />;
}
