CREATE TABLE `coachingRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`monthlyRecordId` int NOT NULL,
	`source` enum('llm','deterministic-fallback') NOT NULL,
	`headline` text NOT NULL,
	`recommendations` json NOT NULL,
	`verifiedMetrics` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `coachingRecords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `coachingRecords` ADD CONSTRAINT `coachingRecords_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `coachingRecords` ADD CONSTRAINT `coachingRecords_monthlyRecordId_monthlyBusinessRecords_id_fk` FOREIGN KEY (`monthlyRecordId`) REFERENCES `monthlyBusinessRecords`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `coachingRecords_user_month_idx` ON `coachingRecords` (`userId`,`monthlyRecordId`);