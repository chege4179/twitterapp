-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tweet` (
    `tweetId` VARCHAR(191) NOT NULL,
    `tweetContent` VARCHAR(191) NOT NULL,
    `tweetUserId` VARCHAR(191) NOT NULL,
    `tweetImageUrl` VARCHAR(191) NULL,
    `createdAt` VARCHAR(191) NOT NULL,
    `createdOn` VARCHAR(191) NOT NULL,
    `likeCount` INTEGER NOT NULL,
    `retweetCount` INTEGER NOT NULL,

    PRIMARY KEY (`tweetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `commentId` VARCHAR(191) NOT NULL,
    `commentContent` VARCHAR(191) NOT NULL,
    `commentUserId` VARCHAR(191) NOT NULL,
    `commentTweetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `likeId` VARCHAR(191) NOT NULL,
    `likeUserId` VARCHAR(191) NOT NULL,
    `likeTweetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Retweet` (
    `retweetId` VARCHAR(191) NOT NULL,
    `retweetUserId` VARCHAR(191) NOT NULL,
    `retweetTweetId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`retweetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tweet` ADD CONSTRAINT `Tweet_tweetUserId_fkey` FOREIGN KEY (`tweetUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentUserId_fkey` FOREIGN KEY (`commentUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentTweetId_fkey` FOREIGN KEY (`commentTweetId`) REFERENCES `Tweet`(`tweetId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_likeTweetId_fkey` FOREIGN KEY (`likeTweetId`) REFERENCES `Tweet`(`tweetId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_likeUserId_fkey` FOREIGN KEY (`likeUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Retweet` ADD CONSTRAINT `Retweet_retweetTweetId_fkey` FOREIGN KEY (`retweetTweetId`) REFERENCES `Tweet`(`tweetId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Retweet` ADD CONSTRAINT `Retweet_retweetUserId_fkey` FOREIGN KEY (`retweetUserId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
