ALTER TABLE `users` ADD `emailVerified` integer;--> statement-breakpoint
ALTER TABLE `users` ADD `avatarUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD `permissions` text;--> statement-breakpoint
ALTER TABLE `users` ADD `password` text;--> statement-breakpoint
ALTER TABLE `users` ADD `updatedAt` integer;--> statement-breakpoint
ALTER TABLE `users` ADD `createdAt` integer;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `created_at`;