"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useSectionInView } from "@/lib/hooks";
import { NAV_LINKS } from "@/lib/Data";

export const Footer = () => {
  const { ref } = useSectionInView("Contact Us");
  return (
    <motion.footer
      ref={ref}
      id="Contact-Us"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-900 text-gray-300 py-10 mt-16 w-full pt-20"
    >
      {/* Parent flex */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12 px-6 md:px-12 lg:px-20">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="md:w-1/3 text-center md:text-left"
        >
          <h2 className="text-2xl font-bold mb-4 text-left md:text-left">
            <span className="bg-gradient-to-r via-yellow-300 to-blue-300 text-black px-2 py-1 rounded">
              INTERVUBIT
            </span>
          </h2>
          <p className="text-sm text-left leading-relaxed max-w-sm mx-auto md:mx-2 md:text-left">
            Practice smarter with our AI-powered mock interview platform. Gain
            real-time feedback, sharpen your skills, and build confidence to
            crack your dream job interviews.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="md:w-1/3 flex justify-center"
        >
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">
              <span className="bg-gradient-to-r via-yellow-300 to-blue-300 text-black px-2 py-1 rounded">
                Quick Links
              </span>
            </h3>
            <ul className="space-y-3 text-sm text-left md:text-left">
              {NAV_LINKS.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.hash}
                    className="relative inline-block hover:text-indigo-400 transition-colors 
                      after:content-[''] after:absolute after:left-0 after:bottom-0 
                      after:h-[2px] after:w-0 after:bg-indigo-500 after:transition-all 
                      after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="md:w-1/3 flex justify-center md:justify-end"
        >
          <div>
            <h3 className=" inline-block text-2xl font-semibold mb-4 text-center md:text-left">
              <span className="bg-gradient-to-r via-yellow-300 to-blue-300 text-black px-2 py-1 rounded">
                Follow Us
              </span>
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                {
                  href: "https://github.com/",
                  icon: <Github className="w-5 h-5" />,
                },
                {
                  href: "https://linkedin.com/",
                  icon: <Linkedin className="w-5 h-5" />,
                },
                {
                  href: "mailto:hello@mockai.com",
                  icon: <Mail className="w-5 h-5" />,
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="relative flex items-center justify-center w-10 h-10 rounded-full 
                    border border-gray-600 hover:border-indigo-500 transition-colors group"
                >
                  <span
                    className="absolute inset-0 rounded-full bg-indigo-500 opacity-0 
                    group-hover:opacity-20 transition duration-300"
                  ></span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 w-full px-6"
      >
        © {new Date().getFullYear()} MockAI. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};
