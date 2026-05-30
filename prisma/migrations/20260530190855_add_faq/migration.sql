-- CreateTable
CREATE TABLE "SiteInfo" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "phone" TEXT,
    "factoryAddress" TEXT,
    "instagram" TEXT,
    "telegram" TEXT,
    "bale" TEXT,
    "shopUrl" TEXT,
    "yearsOfExperience" INTEGER DEFAULT 0,
    "deliveredProducts" INTEGER DEFAULT 0,
    "trustedCustomers" INTEGER DEFAULT 0,
    "coveredCountries" INTEGER DEFAULT 0,
    "aboutImage" TEXT,
    "aboutTitle" TEXT,
    "aboutText" TEXT,
    "homePageText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);
