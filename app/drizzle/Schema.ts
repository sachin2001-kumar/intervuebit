import { PgTable, serial, varchar } from "drizzle-orm/pg-core";

export const InterviewDetails = PgTable("InterviewDetails", {
  id: serial("id").primaryKey(),
  createdAt: varchar("CreatedAt").notNull(),
  createdAt: varchar("CreatedAt"),
  JsonMockResp: text("JsonMockResp").notNull(),
  JobPosition: varchar("JobPosition").notNull(),
  JobDesc: varchar("JobDesc").notNull(),
  JobExp: varchar("JobExp").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswerDetails = PgTable("UserAnswerDetails", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  Question: varchar("Questions").notNull(),
  CorrectAns: varchar("CorrectAns").notNull(),
  UserAns: varchar("UserAns").notNull(),
  feedback: varchar("feedback"),
  rating: varchar("rating"),
  createdAt: varchar("CreatedAt"),
  Useremail: varchar("Useremail").notNull(),
});
