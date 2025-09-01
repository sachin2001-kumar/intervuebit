"use client";
import React from "react";
import { useActiveSectionContext } from "../../lib/Active";
import { motion } from "framer-motion";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/ui/menubar";
import { MenuIcon } from "lucide-react";
import { NAV_LINKS } from "../../lib/Data";
import Link from "next/link";
import clsx from "clsx";

export const Navbar = () => {
  const { ActiveSection, setActiveSection } = useActiveSectionContext();

  return (
    <header className="z-[999] relative">
      {/* Background Blur Bar (Desktop only) */}
      <motion.div
        className="hidden lg:block fixed top-0 left-1/2 h-[4.5rem] w-full bg-transparent border-gray-200/30"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      {/* Mobile / Tablet Nav */}
      <div className="flex justify-between items-center px-4 h-16 lg:hidden fixed w-full top-0 bg-transparent backdrop-blur-md z-[1000] border-b border-gray-200/30">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-lg text-gray-900">
          INTERVUBIT
        </Link>

        <div className="flex items-center gap-4">
          <button className="bg-cyan-700 text-black font-bold px-3 py-2 rounded-lg shadow-md hover:bg-cyan-500 transition text-sm">
            Get Started
          </button>

          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger>
                <MenuIcon size={28} />
              </MenubarTrigger>
              <MenubarContent className="mr-4 font-bold bg-white/90 backdrop-blur-md shadow-lg rounded-md">
                {NAV_LINKS.map((item) => (
                  <Link key={item.hash} href={`/${item.hash}`}>
                    <MenubarItem className="p-4 w-[65vw] text-gray-900 hover:bg-gray-100">
                      {item.name}
                    </MenubarItem>
                  </Link>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      {/* Desktop Nav (≥1024px) */}
      <nav className="hidden lg:flex fixed left-1/2 top-0 h-16 w-full -translate-x-1/2 px-8 items-center justify-between bg-transparent backdrop-blur-md border-b-2 border-gray-900/40">
        {/* Logo */}
        <Link
          href="#Home"
          className="font-extrabold text-xl tracking-wide text-gray-900"
        >
          INTERVUBIT
        </Link>

        {/* Links */}
        <ul className="flex items-center justify-center gap-8 text-[1rem] font-medium text-black">
          {NAV_LINKS.map((item) => (
            <motion.li
              key={item.hash}
              className="relative"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "px-3 py-2 hover:text-gray-900 transition relative",
                  { "text-gray-900": ActiveSection === item.name }
                )}
                href={item.hash}
                onClick={() => setActiveSection(item.name)}
              >
                {item.name}
                {item.name === ActiveSection && (
                  <motion.span
                    className="absolute left-0"
                    layoutId="underline"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="bg-cyan-700 text-black font-bold px-5 py-2 rounded-lg shadow-md hover:bg-cyan-500 transition">
          Get Started
        </button>
      </nav>
    </header>
  );
};
