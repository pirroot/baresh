/*
  Warnings:

  - You are about to drop the column `keywords` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "keywords",
ADD COLUMN     "brand" TEXT DEFAULT 'شیرآلات بارشی',
ADD COLUMN     "canonicalUrl" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "faq" JSONB,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "searchTags" JSONB,
ADD COLUMN     "semanticKeywords" JSONB,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "weight" TEXT;
