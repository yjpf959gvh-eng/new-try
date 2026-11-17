import { useState } from 'react';
import { Scale } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1E3A5F] via-[#283B52] to-[#1C2430] text-stone-200 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Scale className="w-8 h-8 mb-2 opacity-80" />
        <span className="text-sm font-medium tracking-wide opacity-90">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
