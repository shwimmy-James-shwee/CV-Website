-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STANDARD_USER', 'ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "NotificationFrequency" AS ENUM ('DISABLED', 'REALTIME', 'HOURLY', 'DAILYEVE', 'DAILYMORN', 'WEEKLY');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('NOTIFIED', 'READ');

-- CreateEnum
CREATE TYPE "Feature" AS ENUM ('BASIC', 'BASIC_REPORTING');

-- CreateEnum
CREATE TYPE "BusinessUnitType" AS ENUM ('TEAM', 'DEPARTMENT', 'DIVISION', 'COMPANY');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('ADMINISTRATOR', 'STANDARD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "externalOid" TEXT,
    "loginEmail" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "isSuperAdmin" BOOLEAN DEFAULT false,
    "roles" "UserRole"[] DEFAULT ARRAY['STANDARD_USER']::"UserRole"[],
    "avatarUrl" TEXT NOT NULL DEFAULT '/assets/defaultAvatar.png',
    "thumbnailPhoto" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "timeZoneOffSet" TEXT NOT NULL DEFAULT '-780',
    "timeZone" TEXT NOT NULL DEFAULT 'Pacific/Auckland',
    "notificationFrequency" "NotificationFrequency" NOT NULL DEFAULT 'REALTIME',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNotification" (
    "id" SERIAL NOT NULL,
    "status" "NotificationStatus"[],
    "message" TEXT NOT NULL,
    "additionalAttribute" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignInLog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "signInDateTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignInLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivityLog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionIdentifier" TEXT,
    "eventStartTime" TIMESTAMP(3) NOT NULL,
    "eventEndTime" TIMESTAMP(3) NOT NULL,
    "eventDuration" INTEGER NOT NULL,
    "eventParam" TEXT,
    "eventUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessUnit" (
    "id" TEXT NOT NULL,
    "type" "BusinessUnitType" NOT NULL DEFAULT 'TEAM',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "features" "Feature"[],
    "parentBusinessUnitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "roles" "MemberRole"[] DEFAULT ARRAY['STANDARD']::"MemberRole"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessUnitId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_loginEmail_key" ON "User"("loginEmail");

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignInLog" ADD CONSTRAINT "SignInLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivityLog" ADD CONSTRAINT "UserActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessUnit" ADD CONSTRAINT "BusinessUnit_parentBusinessUnitId_fkey" FOREIGN KEY ("parentBusinessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_businessUnitId_fkey" FOREIGN KEY ("businessUnitId") REFERENCES "BusinessUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
