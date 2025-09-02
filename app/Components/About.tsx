"use client";
import { bulletPoints } from "@/lib/Data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import React from "react";

export const About = () => {
  const { ref } = useSectionInView("About");
  return (
    <section
      ref={ref}
      id="About"
      className="max-w-6xl mx-auto m-24 px-6 flex flex-col shadow-lg hover:shadow-2xl transition-all justify-center p-10 border-2 border-gray-700 rounded-4xl scroll-mt-24 bg-gradient-to-r from-[#958975] via-[#736956db] to-[#7b6950] hover:shadow-[#a78d60]"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center"
      >
        About Me
      </motion.h2>

      {/* Intro Text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-lg md:text-xl text-gray-800 leading-relaxed text-left mb-10 font-medium"
      >
        I’m building a{" "}
        <span className="font-semibold bg-gradient-to-r from-cyan-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
          Mock AI Interview Platform
        </span>{" "}
        that empowers job seekers to practice and improve their interview skills
        in a realistic environment. The platform simulates real interview
        scenarios using advanced AI models, helping candidates gain confidence,
        reduce anxiety, and receive actionable feedback that traditional mock
        interviews often lack.
        <br />
        <br />
        With a focus on{" "}
        <span className="font-semibold text-left">personalized guidance</span>,
        the system adapts to different career paths and experience levels,
        ensuring every candidate gets tailored practice. Whether you're
        preparing for a technical role, a behavioral round, or even group
        discussions, this platform acts as your **virtual mentor**, available
        anytime, anywhere.
      </motion.p>

      {/* Bullet Points */}
      <ul className="space-y-4">
        {bulletPoints.map((point, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-start space-x-3 text-gray-800 text-xl font-bold"
          >
            <motion.span
              className="w-3 h-3 rounded-full bg-cyan-800 mt-2 flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
            />
            <span>{point}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
