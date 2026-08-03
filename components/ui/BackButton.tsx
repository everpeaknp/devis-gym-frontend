"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, go to homepage
      router.push('/');
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      className="fixed top-4 left-4 z-50 flex items-center justify-center w-12 h-12 text-white hover:text-accent transition-all duration-300 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Go back"
    >
      <ArrowLeft 
        size={20} 
        className="transition-transform duration-300 group-hover:-translate-x-0.5" 
      />
    </motion.button>
  );
}