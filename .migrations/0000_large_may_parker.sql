CREATE TABLE "goals" (
	"id" text PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"desired_weekly_frequency" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
