CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'deleted');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "status" DEFAULT 'active';