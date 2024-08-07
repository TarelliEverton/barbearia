/*
  Warnings:

  - Added the required column `price` to the `BarbershopService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BarbershopService" ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "imageUrl" SET DATA TYPE TEXT;
