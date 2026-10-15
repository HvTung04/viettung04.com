import type { MetadataRoute } from "next";
import prisma from "@/lib/db";

const SITE_URL = "https://viettung04.com";

type Locale = "en" | "vi";

function alternates(path: string) {
  const entry: Record<string, string> = {};
  for (const locale of ["en", "vi"] as Locale[]) {
    entry[locale] = `${SITE_URL}/${locale}${path}`;
  }
  return entry;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/contact",
  ];

  const [projects, blogs] = await Promise.all([
    prisma.project.findMany({
      where: { status: "ACTIVE", visibility: "PUBLIC" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.blog.findMany({
      where: { status: "ACTIVE", visibility: "PUBLIC" },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    const prefix = path === "" ? "" : path;
    entries.push({
      url: `${SITE_URL}/en${prefix}`,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: alternates(path) },
    });
  }

  for (const project of projects) {
    entries.push({
      url: `${SITE_URL}/en/projects/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: project.updatedAt,
      alternates: { languages: alternates(`/projects/${project.slug}`) },
    });
  }

  for (const blog of blogs) {
    entries.push({
      url: `${SITE_URL}/en/blog/${blog.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: blog.updatedAt,
      alternates: { languages: alternates(`/blog/${blog.slug}`) },
    });
  }

  return entries;
}
