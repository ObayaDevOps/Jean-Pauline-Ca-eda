'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MainMap = dynamic(() => import('@/src/components/mapPage/MainMap'), {
  ssr: false,
});

export default function MapPage() {
  return <MainMap />;
}
