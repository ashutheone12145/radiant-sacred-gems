import { ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  className?: string;
}

export function PullToRefresh({ children, onRefresh, className }: PullToRefreshProps) {
  const { isPulling, isRefreshing, pullDistance, progress } = usePullToRefresh({
    onRefresh,
    threshold: 80,
    maxPull: 120,
  });

  const showIndicator = pullDistance > 10 || isRefreshing;

  return (
    <div className={className}>
      {/* Pull indicator */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ 
              opacity: 1, 
              y: Math.max(pullDistance - 40, 0),
            }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
          >
            <div className="mt-2 p-3 rounded-full bg-background shadow-lg border border-border">
              {isRefreshing ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              ) : (
                <motion.div
                  animate={{ rotate: progress * 180 }}
                  className="h-5 w-5 flex items-center justify-center"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-primary"
                    style={{ opacity: progress }}
                  >
                    <path
                      fill="currentColor"
                      d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with pull transform */}
      <motion.div
        animate={{
          y: isRefreshing ? 50 : pullDistance > 10 ? pullDistance * 0.3 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
