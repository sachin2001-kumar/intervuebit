import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const InterviewDetails = pgTable("InterviewformDetails", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  JsonMockResp: text("JsonMockResp").notNull(),
  JobPosition: varchar("JobPosition", { length: 255 }).notNull(),
  JobDesc: text("JobDesc").notNull(),
  JobExp: varchar("JobExp", { length: 50 }).notNull(),
  mockId: varchar("mockId", { length: 255 }).notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const UserInterviews = pgTable("UserAnsDetails", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockIdRef", { length: 255 }).notNull(),
  Useremail: varchar("Useremail", { length: 255 }),
  qaPairs: jsonb("qaPairs").$type<
    {
      Question: string;
      CorrectAns: string;
      UserAns: string;
      feedback: string;
      rating: string;
    }[]
  >(),
  createdAt: timestamp("createdAt").defaultNow(),
});
