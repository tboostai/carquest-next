"use client";

import { motion } from "framer-motion";

export default function LoadingDots() {
  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
} 