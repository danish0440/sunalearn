'use client';

import { useState } from 'react';
import { X, User, Sparkles, Save, History, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface GuestModeCardProps {
  onDismiss?: () => void;
}

export function GuestModeCard({ onDismiss }: GuestModeCardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleSignUp = () => {
    router.push('/auth?mode=signup');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed top-6 right-6 z-40 max-w-sm"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    Guest Mode
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    You're using MAIA as a guest
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Save className="h-3 w-3" />
                <span>Save your conversations</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <History className="h-3 w-3" />
                <span>Access chat history</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <Zap className="h-3 w-3" />
                <span>Unlock advanced features</span>
              </div>
            </div>

            <Button
              onClick={handleSignUp}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm h-8"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Sign Up for Free
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}