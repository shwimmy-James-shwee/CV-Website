/*
  Warnings:

  - You are about to drop the column `additionalAttribute` on the `ContactUsNotification` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ContactUsNotification` table. All the data in the column will be lost.
  - Added the required column `name` to the `ContactUsNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactUsNotification" DROP COLUMN "additionalAttribute",
DROP COLUMN "title",
ADD COLUMN     "company" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sentTimestamp" TIMESTAMP(3);
