CREATE TABLE `oauthAccounts` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`updatedAt` integer,
	`createdAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
