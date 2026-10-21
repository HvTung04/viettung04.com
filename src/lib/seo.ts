import type { Metadata } from "next";

export const SITE_URL = "https://viettung04.com";
export const DEFAULT_LOCALE = "vi" as const;
export const LOCALES = ["vi", "en"] as const;

export type SiteLocale = (typeof LOCALES)[number];

const OG_IMAGE = `${SITE_URL}/opengraph-image`;

export function localizedUrl(locale: SiteLocale, path = ""): string {
  const suffix = path && path !== "/" ? path : "";
  return `${SITE_URL}/${locale}${suffix}`;
}

/**
 * Canonical + hreflang + OpenGraph/Twitter for a public page.
 * Every public route should use this so the whole site stays consistent.
 */
export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  type = "website",
  publishedTime,
  images,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  images?: Array<string | { url: string; width?: number; height?: number; alt?: string }>;
}): Metadata {
  const siteLocale = (locale === "en" ? "en" : "vi") as SiteLocale;
  const canonical = localizedUrl(siteLocale, path);

  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = localizedUrl(loc, path);
  }
  languages["x-default"] = localizedUrl(DEFAULT_LOCALE, path);

  return {
    // Absolute: page titles are written in full, the layout template must not
    // append the brand a second time.
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      siteName: "Hoang Viet Tung",
      locale: siteLocale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: siteLocale === "vi" ? "en_US" : "vi_VN",
      images: images ?? [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Hoang Viet Tung — AI Engineer" }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images ?? [OG_IMAGE],
    },
  };
}

/** JSON-LD graph for the site: the person, the website, and the breadcrumb. */
export function siteJsonLd(locale: SiteLocale, path = "") {
  const url = localizedUrl(locale, path);

  const breadcrumb = path
    ? {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: localizedUrl(locale) },
          { "@type": "ListItem", position: 2, name: path.split("/").filter(Boolean).join(" / "), item: url },
        ],
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: localizedUrl(locale),
        name: "Hoang Viet Tung",
        inLanguage: locale === "vi" ? "vi-VN" : "en-US",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Hoang Viet Tung",
        alternateName: "Viet Tung Hoang",
        url: localizedUrl(locale),
        jobTitle: "AI Engineer",
        description:
          "Senior AI engineer specializing in production-ready machine learning, LLM systems, computer vision, and scalable data pipelines.",
        knowsAbout: [
          "Machine Learning",
          "Deep Learning",
          "LLM",
          "Computer Vision",
          "Natural Language Processing",
          "Data Engineering",
          "Python",
          "PyTorch",
          "TensorFlow",
        ],
        sameAs: [
          "https://github.com/HvTung04",
          "https://www.linkedin.com/in/hvtung04",
        ],
      },
      ...(breadcrumb ? [breadcrumb] : []),
    ],
  };
}
