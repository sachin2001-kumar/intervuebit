import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const InterviewDetails = pgTable("InterviewDetails", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  JsonMockResp: text("JsonMockResp").notNull(),
  JobPosition: varchar("JobPosition", { length: 255 }).notNull(),
  JobDesc: text("JobDesc").notNull(),
  JobExp: varchar("JobExp", { length: 50 }).notNull(),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});

export const UserAnswerDetails = pgTable("UserAnswerDetails", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockIdRef", { length: 255 }).notNull(),
  Question: text("Question").notNull(),
  CorrectAns: text("CorrectAns").notNull(),
  UserAns: text("UserAns").notNull(),
  feedback: text("feedback"),
  rating: varchar("rating", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow(),
  Useremail: varchar("Useremail", { length: 255 }).notNull(),
});
