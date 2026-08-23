CREATE TABLE `monthlyBusinessRecordReviewEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`franchiseeUserId` int NOT NULL,
	`monthlyRecordId` int NOT NULL,
	`reviewerId` int NOT NULL,
	`action` enum('approved','needs-correction') NOT NULL,
	`reviewerNote` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `monthlyBusinessRecordReviewEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD `reviewStatus` enum('awaiting-review','approved','needs-correction') DEFAULT 'awaiting-review' NOT NULL;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD `reviewerId` int;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD `reviewerNote` text;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD `reviewedAt` timestamp;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecordReviewEvents` ADD CONSTRAINT `reviewEvents_franchisee_fk` FOREIGN KEY (`franchiseeUserId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecordReviewEvents` ADD CONSTRAINT `reviewEvents_record_fk` FOREIGN KEY (`monthlyRecordId`) REFERENCES `monthlyBusinessRecords`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecordReviewEvents` ADD CONSTRAINT `reviewEvents_reviewer_fk` FOREIGN KEY (`reviewerId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `recordReviewEvents_record_idx` ON `monthlyBusinessRecordReviewEvents` (`monthlyRecordId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `recordReviewEvents_franchisee_idx` ON `monthlyBusinessRecordReviewEvents` (`franchiseeUserId`,`createdAt`);--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD CONSTRAINT `records_reviewer_fk` FOREIGN KEY (`reviewerId`) REFERENCES `users`(`id`) ON DELETE set null ON UPDATE no action;
