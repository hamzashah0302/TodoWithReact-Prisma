/*
  Warnings:

  - You are about to drop the column `published` on the `Todos` table. All the data in the column will be lost.
  - Made the column `day` on table `Todos` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "published",
ALTER COLUMN "day" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;
