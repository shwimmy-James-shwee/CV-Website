/*
  Warnings:

  - The primary key for the `ContactUsNotification` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ContactUsNotification" DROP CONSTRAINT "ContactUsNotification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ContactUsNotification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ContactUsNotification_id_seq";
