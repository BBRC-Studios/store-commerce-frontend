'use client';

import { STATIC_VIEWER } from "lib/constants";

// eslint-disable-next-line @next/next/no-async-client-component
export default function WardrobeIframe({
  items,
  aspect = 'square',
  minDistance,
  maxDistance
}: {
  items: string[]
  aspect?: string
  minDistance?: number
  maxDistance?: number
}) {
  const iframeFullScreen = () => {
    const iframe = document.getElementById('wardrobe') as HTMLIFrameElement;
    iframe.requestFullscreen();
  }

  return <div className={`flex w-full ${aspect === 'square' ? 'aspect-square' : 'h-full'}`}>
    <iframe
      id="wardrobe"
      src={`${STATIC_VIEWER}?wardrobeItems=${items.join(',')}${minDistance ? `&minDistance=${minDistance}` : ''}${maxDistance ? `&maxDistance=${maxDistance}` : ''}`}
      style={{width: '100%', height: '100%', backgroundColor: '#f6f6f6'}} 
      allow="fullscreen"
    />
    {/*
    <button className="rounded-full bg-slate-700 text-xs px-3 py-2 absolute bottom-2 right-2" onClick={iframeFullScreen}>Toggle FullScreen</button>
    */}
  </div>
}