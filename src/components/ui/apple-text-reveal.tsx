import React from "react";
import { motion } from "framer-motion";

interface AppleTextRevealProps {
  text?: string;
  className?: string;
}

export const AppleTextReveal: React.FC<AppleTextRevealProps> = ({
  text = "Loading",
  className = "font-medium text-lg text-zinc-900 dark:text-white overflow-hidden h-6 relative"
}) => (
  <div className={className}>
    <motion.div
      animate={{ y: ["100%", "0%", "-100%"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  </div>
);

export default AppleTextReveal;
