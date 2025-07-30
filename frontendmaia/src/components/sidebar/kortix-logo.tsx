'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface MaiaLogoProps {
  size?: number;
}
export function MaiaLogo({ size = 24 }: MaiaLogoProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mount, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldInvert = mounted && (
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
  );

  return (
    <div 
      className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex-shrink-0`}
      style={{ width: size, height: size, fontSize: size * 0.6 }}
    >
      M
    </div>
  );
}

// Keep the old export for backward compatibility
export const KortixLogo = MaiaLogo;
