ALTER TABLE "UserAnswerDetails" ALTER COLUMN "CorrectAns" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "UserAnswerDetails" ALTER COLUMN "UserAns" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "UserAnswerDetails" ALTER COLUMN "Useremail" DROP NOT NULL;