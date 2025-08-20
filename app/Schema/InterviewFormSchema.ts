import * as z from "zod";

export const InterviewFormSchema = z.object({
  Jobtitle: z.string().min(1, {
    message:
      "Provide me proper Job Description like Full-Stack Developer/Frontend Developer.",
  }),
  Skills: z.string().min(1, {
    message: "Provide me proper Skills like React.js, Next.js, Node.js.",
  }),
  YearofExprience: z
    .number()
    .min(1, { message: "Provide me proper YOE like 0,1...etc." }),
});
