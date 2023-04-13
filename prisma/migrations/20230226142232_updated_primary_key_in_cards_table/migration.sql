/*
  Warnings:

  - The primary key for the `cards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `scryfall_id` on the `cards` table. All the data in the column will be lost.
  - Added the required column `id` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cards` DROP PRIMARY KEY,
    DROP COLUMN `scryfall_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`, `collection_id`);
