"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="text-center">
        {/* Animated gradient spinner */}
        <div className="mb-8 flex justify-center">
          <motion.div
            className="relative w-20 h-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-purple-500"></div>
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Loading
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Please wait while we prepare your content...
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-linear-to-r from-violet-500 to-purple-600"
              animate={{ y: [-8, 0, -8] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}