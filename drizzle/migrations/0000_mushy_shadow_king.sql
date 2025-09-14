CREATE TABLE "InterviewformDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"JsonMockResp" text NOT NULL,
	"JobPosition" varchar(255) NOT NULL,
	"JobDesc" text NOT NULL,
	"JobExp" varchar(50) NOT NULL,
	"mockId" varchar(255) NOT NULL,
	"createdBy" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "UserAnsDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockIdRef" varchar(255) NOT NULL,
	"Useremail" varchar(255),
	"qaPairs" jsonb,
	"createdAt" timestamp DEFAULT now()
);
