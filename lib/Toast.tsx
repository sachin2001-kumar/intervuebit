"use client";

import { motion, AnimatePresence } from "framer-motion";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`fixed top-20 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
