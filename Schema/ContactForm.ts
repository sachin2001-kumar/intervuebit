import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().trim().min(1, { message: "This field is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  message: z.string().trim().min(1, { message: "Message cannot be empty" }),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
