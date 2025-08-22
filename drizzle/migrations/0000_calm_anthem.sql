CREATE TABLE "InterviewDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"JsonMockResp" text NOT NULL,
	"JobPosition" varchar(255) NOT NULL,
	"JobDesc" text NOT NULL,
	"JobExp" varchar(50) NOT NULL,
	"mockId" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "UserAnswerDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockIdRef" varchar(255) NOT NULL,
	"Question" text NOT NULL,
	"CorrectAns" text NOT NULL,
	"UserAns" text NOT NULL,
	"feedback" text,
	"rating" varchar(50),
	"createdAt" timestamp DEFAULT now(),
	"Useremail" varchar(255) NOT NULL
);
