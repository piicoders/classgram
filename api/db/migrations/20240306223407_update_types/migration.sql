/*
  Warnings:

  - The values [PROFESSOR,STUDENT] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `code` on the `Classroom` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('P', 'S');
ALTER TABLE "User" ALTER COLUMN "type" TYPE "UserType_new" USING ("type"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "UserType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_professorId_fkey";

-- DropForeignKey
ALTER TABLE "_classStudents" DROP CONSTRAINT "_classStudents_B_fkey";

-- AlterTable
ALTER TABLE "Classroom" ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "code" SET DATA TYPE VARCHAR(5),
ALTER COLUMN "professorId" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR,
ALTER COLUMN "email" SET DATA TYPE VARCHAR,
ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "hashedPassword" SET DATA TYPE VARCHAR,
ALTER COLUMN "salt" SET DATA TYPE VARCHAR,
ALTER COLUMN "resetToken" SET DATA TYPE VARCHAR,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_classStudents" ALTER COLUMN "B" SET DATA TYPE VARCHAR;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classStudents" ADD CONSTRAINT "_classStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
