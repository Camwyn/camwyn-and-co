const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const NOTES_DIR = path.join(__dirname, '../src/notes');
const SUBSTACK_FEED_URL = 'https://ivypage.substack.com/feed';
const PE_BASE_URL = 'https://poeticentanglement.com/posts';

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
}

function extractSlug(link, guid, title) {
  if (link) {
    const match = link.match(/\/p\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
  }
  if (guid && guid.includes('/p/')) {
    const match = guid.match(/\/p\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
  }
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function syncIvyDispatches(options = {}) {
  const isForce = options.force || process.argv.includes('--force');
  const isDryRun = options.dryRun || process.argv.includes('--dry-run');

  console.log('📡 Fetching Ivy Page Substack feed:', SUBSTACK_FEED_URL);

  let xmlText;
  try {
    const res = await fetch(SUBSTACK_FEED_URL, { headers: BROWSER_HEADERS });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    xmlText = await res.text();
  } catch (err) {
    console.error('✖ Failed to fetch Substack feed:', err.message);
    return { created: 0, skipped: 0, errors: 1 };
  }

  const dom = new JSDOM(xmlText, { contentType: 'text/xml' });
  const doc = dom.window.document;
  const items = Array.from(doc.querySelectorAll('item'));

  console.log(`Found ${items.length} items in feed.\n`);

  let createdCount = 0;
  let skippedCount = 0;

  if (!fs.existsSync(NOTES_DIR)) {
    fs.mkdirSync(NOTES_DIR, { recursive: true });
  }

  for (const item of items) {
    const rawTitle = item.querySelector('title')?.textContent || '';
    const title = decodeEntities(rawTitle).trim();
    const link = item.querySelector('link')?.textContent || '';
    const guid = item.querySelector('guid')?.textContent || '';
    const pubDateStr = item.querySelector('pubDate')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const contentEncoded = item.querySelector('encoded')?.textContent || description;

    if (!title) continue;

    const slug = extractSlug(link, guid, title);
    const targetFile = path.join(NOTES_DIR, `${slug}.md`);

    if (fs.existsSync(targetFile) && !isForce) {
      skippedCount++;
      continue;
    }

    // Format date as ISO YYYY-MM-DD
    let isoDate = new Date().toISOString().split('T')[0];
    if (pubDateStr) {
      const parsedDate = new Date(pubDateStr);
      if (!isNaN(parsedDate.getTime())) {
        isoDate = parsedDate.toISOString().split('T')[0];
      }
    }

    // Extract clean excerpt
    let excerpt = stripHtml(decodeEntities(description));
    if (excerpt.length > 220) {
      excerpt = excerpt.substring(0, 217).trim() + '...';
    }

    // Extract first punchy quote or sentence from body
    let leadQuote = excerpt;
    const bodyDom = new JSDOM(`<div>${contentEncoded}</div>`);
    const firstP = bodyDom.window.document.querySelector('p');
    if (firstP) {
      const pText = stripHtml(decodeEntities(firstP.textContent || ''));
      if (pText.length > 20) {
        leadQuote = pText.length > 280 ? pText.substring(0, 277).trim() + '...' : pText;
      }
    }

    const peUrl = `${PE_BASE_URL}/${slug}/`;

    const markdownContent = `---
title: ${JSON.stringify(title)}
date: ${isoDate}
archetype: "storykeeper"
excerpt: ${JSON.stringify(excerpt)}
author: "Ivy Page"
canonicalUrl: ${JSON.stringify(link || peUrl)}
---

*Originally published by Ivy Page on [Poetic Entanglement](${peUrl}).*

> ${leadQuote}

[Read the full dispatch on Poetic Entanglement →](${peUrl})
`;

    if (isDryRun) {
      console.log(`[DRY RUN] Would create: ${slug}.md ("${title}")`);
    } else {
      fs.writeFileSync(targetFile, markdownContent, 'utf8');
      console.log(`[+] Created dispatch: ${slug}.md ("${title}")`);
      createdCount++;
    }
  }

  console.log(`\n✓ Syndication complete: ${createdCount} created, ${skippedCount} existing up-to-date.`);
  return { created: createdCount, skipped: skippedCount, errors: 0 };
}

if (require.main === module) {
  syncIvyDispatches().catch(err => {
    console.error('Fatal error during sync:', err);
    process.exit(1);
  });
}

module.exports = { syncIvyDispatches };
