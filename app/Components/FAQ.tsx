"use client";
import { useState, useEffect } from "react";
import { FAQS } from "@/lib/Data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
    <section
      ref={ref}
      id="FAQ"
      className="max-w-6xl mx-auto m-16 p-6 px-6 flex flex-col justify-center border-gray-700 rounded-4xl scroll-mt-24"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center"
      >
        Frequently Asked Questions
      </motion.h2>

      {/* FAQ List */}
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
              className="rounded-2xl border border-gray-400 shadow-sm hover:shadow-md transition-all bg-gradient-to-l via-gray-600 to-gray-500"
            >
              <button
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
                className="w-full flex justify-between items-center px-6 py-5 text-lg font-medium text-black focus:outline-none"
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
    </section>
  );
}
