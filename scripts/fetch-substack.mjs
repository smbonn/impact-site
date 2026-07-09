// Pulls Sierra's Substack RSS feed and writes data/substack-posts.json in the
// shape js/substack-feed.js expects. Uses only Node's built-in fetch (Node 18+)
// so there is nothing to install and nothing to keep updated.
//
// Run manually with:  node scripts/fetch-substack.mjs
// Runs automatically via .github/workflows/update-substack.yml

import { writeFile } from "node:fs/promises";

const FEED_URL = "https://sierramariebonn.substack.com/feed";
const OUTPUT_PATH = new URL("../data/substack-posts.json", import.meta.url);
const MAX_ITEMS = 12;

function tagValue(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  if (!match) return "";
  return match[1]
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFrom(descriptionHtml, wordLimit = 40) {
  const text = stripHtml(descriptionHtml);
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "\u2026";
}

async function main() {
  const res = await fetch(FEED_URL, {
    headers: { "User-Agent": "impactconsultingagency.org-feed-bot/1.0" }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch Substack feed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();

  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  const posts = itemBlocks.slice(0, MAX_ITEMS).map((block) => {
    const title = tagValue(block, "title");
    const link = tagValue(block, "link");
    const pubDate = tagValue(block, "pubDate");
    const description = tagValue(block, "description");
    const category = tagValue(block, "category");
    return {
      title: stripHtml(title),
      link: link.trim(),
      pubDate: pubDate ? new Date(pubDate).toISOString() : "",
      category: category ? stripHtml(category) : "",
      excerpt: excerptFrom(description)
    };
  });

  if (posts.length === 0) {
    console.warn("No items parsed from feed \u2014 leaving existing JSON file untouched.");
    return;
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(posts, null, 2) + "\n", "utf-8");
  console.log(`Wrote ${posts.length} posts to data/substack-posts.json`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
