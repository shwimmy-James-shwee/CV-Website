/*
  Warnings:

  - You are about to drop the column `externalOid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notificationFrequency` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailPhoto` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timeZone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timeZoneOffSet` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BusinessUnit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserActivityLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserNotification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessUnit" DROP CONSTRAINT "BusinessUnit_parentBusinessUnitId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_businessUnitId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivityLog" DROP CONSTRAINT "UserActivityLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserNotification" DROP CONSTRAINT "UserNotification_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "externalOid",
DROP COLUMN "notificationFrequency",
DROP COLUMN "roles",
DROP COLUMN "thumbnailPhoto",
DROP COLUMN "timeZone",
DROP COLUMN "timeZoneOffSet";

-- DropTable
DROP TABLE "BusinessUnit";

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "UserActivityLog";

-- DropTable
DROP TABLE "UserNotification";

-- DropEnum
DROP TYPE "BusinessUnitType";

-- DropEnum
DROP TYPE "Feature";

-- DropEnum
DROP TYPE "MemberRole";

-- DropEnum
DROP TYPE "NotificationFrequency";

-- DropEnum
DROP TYPE "NotificationStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "ContactUsNotification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "submittedByEmail" TEXT NOT NULL,
    "additionalAttribute" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactUsNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "highlighted" BOOLEAN NOT NULL DEFAULT false,
    "dateStarted" TIMESTAMP(3) NOT NULL,
    "dateEnded" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "displaySequence" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
