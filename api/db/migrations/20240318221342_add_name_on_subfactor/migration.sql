/*
  Warnings:

  - Added the required column `name` to the `Subfactor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subfactor" ADD COLUMN     "name" VARCHAR NOT NULL;
