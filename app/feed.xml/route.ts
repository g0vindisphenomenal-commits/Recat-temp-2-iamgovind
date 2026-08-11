import { getAllPosts } from "@/lib/blog-data";
import { siteConfig } from "@/lib/metadata";

export const dynamic = "force-static";

export async function GET() {

  const posts = getAllPosts();
  const baseUrl = siteConfig.url;

  const rssItemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.id}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.id}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Govind B | Digital Marketer & Web Developer]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[Insights on SEO, E-Commerce, Growth Hacking, and Modern Web Development.]]></description>
    <language>en</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
