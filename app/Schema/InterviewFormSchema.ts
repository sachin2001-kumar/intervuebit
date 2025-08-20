import * as z from "zod";

export const InterviewFormSchema = z.object({
  JobTitle: z
    .string()
    .trim()
    .min(3, {
      message:
        "Job title must be at least 3 characters. Example: Frontend Developer, Full Stack Engineer.",
    })
    .max(100, { message: "Job title is too long." }),

  Skills: z
    .array(
      z
        .string()
        .trim()
        .min(2, { message: "Each skill must be at least 2 characters." })
        .max(50, { message: "Skill name too long." })
    )
    .nonempty({ message: "At least one skill is required." }),

  YearsOfExperience: z
    .number()
    .int({ message: "Years of experience must be an integer." })
    .min(0, { message: "Years of experience cannot be negative." })
    .max(50, { message: "Years of experience seems unrealistic." }),
});

export type InterviewFormType = z.infer<typeof InterviewFormSchema>;
