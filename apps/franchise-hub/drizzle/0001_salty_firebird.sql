CREATE TABLE `franchiseProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`operatingTarget` decimal(8,2) NOT NULL,
	`wageBenchmark` decimal(10,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `franchiseProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `franchiseProfiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `monthlyBusinessRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`monthKey` varchar(7) NOT NULL,
	`availabilityHours` decimal(10,2) NOT NULL,
	`actualWorkHours` decimal(10,2) NOT NULL,
	`completedBaskets` int NOT NULL,
	`customerSales` decimal(12,2) NOT NULL,
	`productCostPct` decimal(5,2) NOT NULL,
	`deliveryCostPerBasket` decimal(10,2) NOT NULL,
	`paymentCostPct` decimal(5,2) NOT NULL,
	`royaltyPct` decimal(5,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `monthlyBusinessRecords_id` PRIMARY KEY(`id`),
	CONSTRAINT `monthlyBusinessRecords_user_month_unique` UNIQUE(`userId`,`monthKey`)
);
--> statement-breakpoint
ALTER TABLE `franchiseProfiles` ADD CONSTRAINT `franchiseProfiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `monthlyBusinessRecords` ADD CONSTRAINT `monthlyBusinessRecords_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `monthlyBusinessRecords_user_month_idx` ON `monthlyBusinessRecords` (`userId`,`monthKey`);