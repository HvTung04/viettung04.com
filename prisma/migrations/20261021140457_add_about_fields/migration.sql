-- CreateTable
CREATE TABLE "AboutField" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "AboutField_locale_group_idx" ON "AboutField"("locale", "group");

-- CreateIndex
CREATE UNIQUE INDEX "AboutField_key_locale_key" ON "AboutField"("key", "locale");
