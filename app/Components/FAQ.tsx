"use client";
import { useState, useEffect } from "react";
import { FAQS } from "@/lib/Data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useActiveSectionContext } from "@/lib/Active";
import { useSectionInView } from "@/lib/hooks";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref } = useSectionInView("FAQ");

  useEffect(() => {
    setOpenIndex(0);
  }, []);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <motion.section
      className="max-w-6xl mx-auto my-12 px-4 font-sans pt-20"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.175 }}
      ref={ref}
      id="FAQ"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 font-extrabold text-4xl text-gray-900"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-4">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-2xl border border-gray-400 shadow-sm hover:shadow-md transition-all bg-gradient-to-r via-blue-300 to-yellow-100"
            >
              <button
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
                className="w-full flex justify-between items-center px-6 py-5 text-lg font-medium text-gray-800 focus:outline-none"
              >
                <span>{item.question}</span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-black"
                >
                  <ChevronDown size={22} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-900 text-base leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
