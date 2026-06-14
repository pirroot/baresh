/*
  Warnings:

  - You are about to drop the column `message` on the `ProductComment` table. All the data in the column will be lost.
  - Added the required column `text` to the `ProductComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductComment" DROP COLUMN "message",
ADD COLUMN     "text" TEXT NOT NULL;
