/*
  Warnings:

  - You are about to drop the column `activityId` on the `Prompt` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Prompt_activityId_key";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "activityId";
