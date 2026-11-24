import { useState } from 'react';

interface RussiaPhotoProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function RussiaPhoto({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: RussiaPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#d9d6dd] via-[#bfc5d4] to-[#8f9fba] text-[#14182a] p-6 text-center ${className}`}
      >
        <svg
          viewBox="0 0 48 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-auto opacity-70 mb-3"
          aria-hidden="true"
        >
          <path d="M1 21 L15 4 L24 14 L31 7 L47 21" />
          <path d="M10 21 L15 15 L19 21" />
          <path d="M27 21 L31 16 L36 21" />
        </svg>
        <span className="text-xs font-medium opacity-80 max-w-[22ch] leading-relaxed">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
