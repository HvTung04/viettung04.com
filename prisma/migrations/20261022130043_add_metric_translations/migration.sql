-- CreateTable
CREATE TABLE "SiteMetricTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "locale" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "metricId" TEXT NOT NULL,
    CONSTRAINT "SiteMetricTranslation_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "SiteMetric" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteMetricTranslation_metricId_locale_key" ON "SiteMetricTranslation"("metricId", "locale");

-- CreateIndex
CREATE INDEX "SiteMetric_status_order_idx" ON "SiteMetric"("status", "order");
