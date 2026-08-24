CREATE TABLE `monthlyBusinessRecordRevisions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`monthlyRecordId` int NOT NULL,
	`monthKey` varchar(7) NOT NULL,
	`action` enum('created','updated') NOT NULL,
	`inputSnapshot` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `monthlyBusinessRecordRevisions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD `dataOrigin` varchar(64) DEFAULT 'franchisee-attested' NOT NULL;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD `attestationConfirmed` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD `attestedAt` timestamp;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecordRevisions` ADD CONSTRAINT `monthlyBusinessRecordRevisions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecordRevisions` ADD CONSTRAINT `recordRevisions_record_fk` FOREIGN KEY (`monthlyRecordId`) REFERENCES `monthlyBusinessRecords`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `monthlyBusinessRecordRevisions_user_month_idx` ON `monthlyBusinessRecordRevisions` (`userId`,`monthKey`);
