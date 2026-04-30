import { MetadataRoute } from "next";
import { people } from "@/data/people";
import { concepts } from "@/data/concepts";
import { tags } from "@/data/tags";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://valueomni.com"; // ⚠️ 以后换成你真实域名

  const peopleUrls = people.map((p) => ({
    url: `${baseUrl}/people/${p.slug}`,
    lastModified: new Date(),
  }));

  const conceptUrls = concepts.map((c) => ({
    url: `${baseUrl}/concepts/${c.slug}`,
    lastModified: new Date(),
  }));

  const tagUrls = tags.map((t) => ({
    url: `${baseUrl}/tags/${t.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...peopleUrls,
    ...conceptUrls,
    ...tagUrls,
  ];
}