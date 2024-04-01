/*
  Warnings:

  - Made the column `promptId` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `classroomId` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_promptId_fkey";

-- DropIndex
DROP INDEX "Activity_promptId_key";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "promptId" SET NOT NULL,
ALTER COLUMN "classroomId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
