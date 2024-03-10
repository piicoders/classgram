/*
  Warnings:

  - You are about to drop the column `promtId` on the `Criterion` table. All the data in the column will be lost.
  - Added the required column `promptId` to the `Criterion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Criterion" DROP CONSTRAINT "Criterion_promtId_fkey";

-- AlterTable
ALTER TABLE "Criterion" DROP COLUMN "promtId",
ADD COLUMN     "promptId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Criterion" ADD CONSTRAINT "Criterion_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
