/*
  Warnings:

  - You are about to drop the column `from` on the `Correction` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Correction` table. All the data in the column will be lost.
  - Added the required column `severity` to the `Correction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Correction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('N', 'B', 'G');

-- AlterTable
ALTER TABLE "Correction" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "correct" VARCHAR,
ADD COLUMN     "severity" "Severity" NOT NULL,
ADD COLUMN     "text" VARCHAR NOT NULL;
