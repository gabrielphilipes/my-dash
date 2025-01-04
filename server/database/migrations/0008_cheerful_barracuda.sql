CREATE TABLE `teamMembers` (
	`id` text PRIMARY KEY NOT NULL,
	`teamId` text,
	`userId` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
