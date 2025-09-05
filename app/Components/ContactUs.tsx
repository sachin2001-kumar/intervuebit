"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormData, ContactFormSchema } from "@/Schema/ContactForm";
import { useSectionInView } from "@/lib/hooks";
import { Toast } from "@/lib/Toast";

export const ContactUs = () => {
  const [toast, SetToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { ref } = useSectionInView("Contact Us");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("api/contact", {
        method: "POST",
        headers: { "Content/Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        SetToast({ message: "Message Send Successfully", type: "success" });
        reset();
      } else {
        SetToast({ message: "Failed to send message.", type: "error" });
      }
      setTimeout(() => {
        SetToast(null);
      }, 5000);
    } catch (e) {
      SetToast({ message: `Something went wrong! -> ${e}`, type: "error" });
      setTimeout(() => SetToast(null), 3000);
      console.log(e);
    }
  };
  return (
    <>
      <motion.form
        ref={ref}
        id="Contact-Us"
        className="flex flex-col max-w-6xl mx-auto border-gray-800 bg-[#948e80] border-2 shadow-lg rounded-2xl p-6 space-y-5 scroll-mt-24  hover:shadow-[#b4a5b4] transition-all m-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Contact Us
        </motion.h2>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block font-medium text-gray-800">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border-2 border-gray-600 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          {errors.name && (
            <p className="text-yellow-500 text-md">{errors.name.message}</p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block font-medium text-gray-800">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border-2 border-gray-600 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
          {errors.email && (
            <p className="text-yellow-500 text-md">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block font-medium text-gray-800">Message</label>
          <textarea
            rows={4}
            {...register("message")}
            className="w-full border-2 border-gray-600 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-cyan-500 outline-none resize-none [&::-webkit-resizer]:appearance-none"
          />
          {errors.message && (
            <p className="text-yellow-500 text-md">{errors.message.message}</p>
          )}
        </motion.div>

        {/* Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-fit bg-cyan-600 text-gray-900 py-2 text-xl font-bold rounded-lg shadow-md hover:bg-cyan-700 transition disabled:opacity-50 p-6"
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => SetToast(null)}
        />
      )}
    </>
  );
};
