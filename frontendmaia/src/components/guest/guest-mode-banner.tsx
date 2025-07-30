'use client';

import { useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface GuestModeBannerProps {
  onDismiss?: () => void;
}

export function GuestModeBanner({ onDismiss }: GuestModeBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleSignUp = () => {
    router.push('/auth?mode=signup');
  };

  const handleSignIn = () => {
    router.push('/auth');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-medium text-sm sm:text-base">
                You're using MAIA as a guest!
              </span>
              <span className="text-xs sm:text-sm text-blue-100">
                Sign up to save your conversations and unlock advanced features.
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignIn}
              className="text-white hover:bg-white/20 text-xs sm:text-sm px-2 sm:px-3"
            >
              Sign In
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSignUp}
              className="bg-white text-blue-600 hover:bg-blue-50 text-xs sm:text-sm px-2 sm:px-3 flex items-center gap-1"
            >
              Sign Up
              <ArrowRight className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}