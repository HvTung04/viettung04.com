-- CreateTable
CREATE TABLE "ServiceTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "ServiceTranslation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TechnologyTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "technologyId" TEXT NOT NULL,
    CONSTRAINT "TechnologyTranslation_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTranslation_serviceId_locale_key" ON "ServiceTranslation"("serviceId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "TechnologyTranslation_technologyId_locale_key" ON "TechnologyTranslation"("technologyId", "locale");
