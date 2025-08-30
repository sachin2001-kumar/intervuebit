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
      {/* Main nav background */}
      <motion.div
        className="hidden sm:block fixed top-0 left-1/2 h-[4.5rem] w-full bg-transparent bg-opacity-80 backdrop-blur-[0.5rem] sm:top-0 sm:h-[4rem] sm:w-full sm:rounded-none border-b"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      {/* Mobile Nav */}
      <div className="flex justify-between items-center px-4 h-16 sm:hidden relative z-[1000]">
        {/* Logo */}
        <Link href="/" className="font-extrabold text-lg">
          INTERVUBIT
        </Link>

        <div className="flex items-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get Started
          </button>

          <Menubar className="bg-transparent border-none">
            <MenubarMenu>
              <MenubarTrigger>
                <MenuIcon size={32} />
              </MenubarTrigger>
              <MenubarContent className="mr-4 font-bold border-r-8 bg-green-50">
                {NAV_LINKS.map((item) => (
                  <Link key={item.hash} href={`/${item.hash}`}>
                    <MenubarItem className="p-4 w-[65vw]">
                      {item.name}
                    </MenubarItem>
                  </Link>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      {/* Desktop View */}
      <nav className="hidden sm:flex fixed left-1/2 top-0 h-16 w-full -translate-x-1/2 px-8 items-center justify-between bg-transparent">
        {/* Logo on left */}
        <Link
          href="#Home"
          className="font-extrabold text-xl tracking-wide text-gray-900"
        >
          INTERVUBIT
        </Link>

        {/* Nav links in center */}
        <ul className="flex items-center justify-center gap-6 text-[1rem] font-medium text-black">
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
                    className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-500"
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

        {/* Button on right */}
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          Get Started
        </button>
      </nav>
    </header>
  );
};
