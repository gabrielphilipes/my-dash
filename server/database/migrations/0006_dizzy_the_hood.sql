CREATE TABLE `userCodes` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`code` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`updatedAt` integer,
	`createdAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `emailVerificationCode`;