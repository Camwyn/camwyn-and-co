const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE_DIR = path.join(__dirname, '../_site');
const DATA_DIR = path.join(__dirname, '../src/_data');
const NOTES_DIR = path.join(__dirname, '../src/notes');

let totalErrors = 0;
let totalPasses = 0;

function assert(condition, message) {
  if (condition) {
    totalPasses++;
    console.log(`  [✓ PASS] ${message}`);
  } else {
    totalErrors++;
    console.error(`  [✖ FAIL] ${message}`);
  }
}

// Utility: recursively get all files matching extension
function getAllFiles(dirPath, ext, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, ext, arrayOfFiles);
    } else if (file.endsWith(ext)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// ============================================================================
// 1. JSON-LD Structured Data Schema Validation
// ============================================================================
function testJsonLdSchemas() {
  console.log('\n========================================');
  console.log('1. JSON-LD Structured Data Schema Validation');
  console.log('========================================');

  const htmlFiles = getAllFiles(SITE_DIR, '.html');
  let schemasFound = 0;

  htmlFiles.forEach(file => {
    const relPath = path.relative(SITE_DIR, file);
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const scripts = dom.window.document.querySelectorAll('script[type="application/ld+json"]');

    scripts.forEach(script => {
      schemasFound++;
      let data;
      try {
        data = JSON.parse(script.textContent);
        assert(true, `${relPath} — Valid JSON-LD syntax`);
      } catch (err) {
        assert(false, `${relPath} — JSON-LD parse error: ${err.message}`);
        return;
      }

      // Check Organization / WebSite (@graph)
      if (data['@graph']) {
        const org = data['@graph'].find(item => item['@type'] === 'Organization');
        const site = data['@graph'].find(item => item['@type'] === 'WebSite');

        if (org) {
          assert(org.name && org.url && org.logo, `${relPath} — Organization schema has name, url, logo`);
          assert(Array.isArray(org.founder) && org.founder.length >= 2, `${relPath} — Organization schema has multiple founders`);
          assert(org.founder.every(f => f.name && f.alternateName), `${relPath} — Founders have name and alternateName (nicknames)`);
        }
        if (site) {
          assert(site.name && site.url, `${relPath} — WebSite schema has name and url`);
        }
      }

      // Check BlogPosting / Article
      if (data['@type'] === 'BlogPosting' || data['@type'] === 'Article') {
        assert(Boolean(data.headline), `${relPath} — BlogPosting has headline`);
        assert(Boolean(data.datePublished && data.dateModified), `${relPath} — BlogPosting has datePublished and dateModified`);
        assert(Boolean(data.author && data.author.name), `${relPath} — BlogPosting has author entity`);
        assert(Boolean(data.publisher && data.publisher.name), `${relPath} — BlogPosting has publisher entity`);
        assert(Boolean(data.mainEntityOfPage && data.mainEntityOfPage['@id']), `${relPath} — BlogPosting has mainEntityOfPage ID`);
      }
    });
  });

  assert(schemasFound >= 13, `Discovered and verified ${schemasFound} JSON-LD schemas across site`);
}

// ============================================================================
// 2. Static Search Index Completeness & Integrity
// ============================================================================
function testSearchIndex() {
  console.log('\n========================================');
  console.log('2. Static Search Index (_site/search-index.json)');
  console.log('========================================');

  const indexPath = path.join(SITE_DIR, 'search-index.json');
  assert(fs.existsSync(indexPath), `search-index.json exists in _site`);

  if (!fs.existsSync(indexPath)) return;

  const raw = fs.readFileSync(indexPath, 'utf8');
  let items = [];
  try {
    items = JSON.parse(raw);
    assert(Array.isArray(items), `search-index.json parsed as JSON Array`);
  } catch (err) {
    assert(false, `search-index.json JSON parse error: ${err.message}`);
    return;
  }

  const noteFiles = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'));
  assert(items.length === noteFiles.length, `search-index.json indexed all ${noteFiles.length} dispatches (found: ${items.length})`);

  items.forEach(item => {
    const valid = item.url && item.title && item.archetype && item.archetypeTag && item.date && item.content && item.content.length > 50;
    assert(Boolean(valid), `Indexed Note: "${item.title}" — Full-text content (${(item.content || '').length} chars)`);
  });
}

// ============================================================================
// 3. XML Syndication & Indexing Validation (Sitemap, Feed, Robots)
// ============================================================================
function testXmlAndSeo() {
  console.log('\n========================================');
  console.log('3. XML Feeds & SEO Metadata');
  console.log('========================================');

  // Sitemap
  const sitemapPath = path.join(SITE_DIR, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), `sitemap.xml exists in _site`);
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    assert(sitemap.includes('<urlset') && sitemap.includes('</urlset>'), `sitemap.xml has valid <urlset> wrapper`);
    const locMatches = sitemap.match(/<loc>(https:\/\/camwyn\.com[^<]+)<\/loc>/g) || [];
    assert(locMatches.length >= 15, `sitemap.xml contains ${locMatches.length} canonical URLs`);
  }

  // Atom Feed
  const feedPath = path.join(SITE_DIR, 'feed.xml');
  assert(fs.existsSync(feedPath), `feed.xml exists in _site`);
  if (fs.existsSync(feedPath)) {
    const feed = fs.readFileSync(feedPath, 'utf8');
    assert(feed.includes('<feed') && feed.includes('</feed>'), `feed.xml has valid <feed> wrapper`);
    const entries = feed.match(/<entry>/g) || [];
    assert(entries.length >= 10, `feed.xml contains ${entries.length} published note entries`);
  }

  // Robots.txt
  const robotsPath = path.join(SITE_DIR, 'robots.txt');
  assert(fs.existsSync(robotsPath), `robots.txt exists in _site`);
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, 'utf8');
    assert(robots.includes('Sitemap: https://camwyn.com/sitemap.xml'), `robots.txt defines canonical Sitemap location`);
  }
}

// ============================================================================
// 4. Dead Links, Anchors & Media Asset Crawler
// ============================================================================
function testLinksAndAssets() {
  console.log('\n========================================');
  console.log('4. Dead Links & Missing Media Asset Crawler');
  console.log('========================================');

  const htmlFiles = getAllFiles(SITE_DIR, '.html');
  let checkedLinks = 0;
  let checkedImages = 0;

  htmlFiles.forEach(file => {
    const relPath = path.relative(SITE_DIR, file);
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Check <a> internal links and accessible names
    const allAnchors = doc.querySelectorAll('a');
    allAnchors.forEach(a => {
      const href = (a.getAttribute('href') || '').trim();
      assert(href !== '', `${relPath} -> Link has non-empty href`);
      
      if (href.toLowerCase().startsWith('mailto:')) {
        const email = href.replace(/^mailto:/i, '').split('?')[0].trim();
        assert(email.length > 0 && email.includes('@'), `${relPath} -> mailto link "${href}" has a valid email address`);
      }

      const text = a.textContent.trim();
      const ariaLabel = a.getAttribute('aria-label') || '';
      const imgAlt = a.querySelector('img[alt]')?.getAttribute('alt') || '';
      assert(Boolean(text || ariaLabel || imgAlt), `${relPath} -> Link "${href}" has discernible text`);

      // Skip external, mailto, tel, javascript for file resolution check
      if (/^(https?:\/\/|mailto:|tel:|javascript:)/i.test(href)) return;

      checkedLinks++;

      // In-page anchor hash e.g. #your-compass
      if (href.startsWith('#')) {
        const targetId = href.substring(1);
        if (targetId) {
          const targetEl = doc.getElementById(targetId) || doc.querySelector(`[name="${targetId}"]`);
          assert(Boolean(targetEl), `${relPath} — Anchor target #${targetId} exists in DOM`);
        }
        return;
      }

      // Root-relative internal link e.g. /our-story/ or /#your-compass or /assets/favicon.svg
      const [pathname, hash] = href.split('#');
      let targetFile;

      if (pathname.endsWith('/')) {
        targetFile = path.join(SITE_DIR, pathname, 'index.html');
      } else if (path.extname(pathname)) {
        targetFile = path.join(SITE_DIR, pathname);
      } else if (pathname === '') {
        targetFile = file; // Same file
      } else {
        targetFile = path.join(SITE_DIR, pathname, 'index.html');
      }

      const fileExists = fs.existsSync(targetFile);
      assert(fileExists, `${relPath} -> Link to ${href} resolves to existing file`);

      if (fileExists && hash) {
        const targetHtml = fs.readFileSync(targetFile, 'utf8');
        const targetDom = new JSDOM(targetHtml);
        const targetEl = targetDom.window.document.getElementById(hash);
        assert(Boolean(targetEl), `${relPath} -> Hash anchor #${hash} exists on target page ${pathname}`);
      }
    });

    // Check <img> internal assets
    const images = doc.querySelectorAll('img[src]');
    images.forEach(img => {
      const src = img.getAttribute('src').trim();
      if (/^(https?:\/\/|data:)/i.test(src)) return;

      checkedImages++;
      const targetAsset = path.join(SITE_DIR, src);
      assert(fs.existsSync(targetAsset), `${relPath} -> Image src "${src}" exists`);
    });
  });

  console.log(`  (Verified ${checkedLinks} internal links and ${checkedImages} local images)`);
}

// ============================================================================
// 5. Adventure Compass Scoring & Data Integrity Unit Tests
// ============================================================================
function testCompassMatrix() {
  console.log('\n========================================');
  console.log('5. Adventure Compass Scoring Matrix & Data Integrity');
  console.log('========================================');

  const compassJsonPath = path.join(DATA_DIR, 'compass.json');
  assert(fs.existsSync(compassJsonPath), `compass.json exists in src/_data`);
  if (!fs.existsSync(compassJsonPath)) return;

  const compass = JSON.parse(fs.readFileSync(compassJsonPath, 'utf8'));
  const canonicalArchetypes = Object.keys(compass.archetypes || {});
  assert(canonicalArchetypes.length >= 5, `Compass defines at least 5 creative archetypes (found: ${canonicalArchetypes.length})`);

  // Check archetypes complete data contracts
  canonicalArchetypes.forEach(archKey => {
    const arch = compass.archetypes[archKey];
    assert(Boolean(arch && arch.id && arch.name && arch.icon && arch.tagline && arch.description && arch.gift), `Archetype "${archKey}" defines id, name, icon, tagline, description, and gift`);
    assert(Boolean(arch.dispatchTag && arch.partnership), `Archetype "${archKey}" defines dispatchTag and partnership copy`);
    assert(Boolean(arch.notFound && arch.notFound.eyebrow && arch.notFound.title && arch.notFound.body && arch.notFound.ctaText && arch.notFound.ctaUrl), `Archetype "${archKey}" defines complete 404 message object`);
  });

  // Check questions
  assert(Array.isArray(compass.questions) && compass.questions.length === 5, `Compass defines exactly 5 quiz questions`);
  compass.questions.forEach((q, idx) => {
    assert(Boolean(q.id && (q.prompt || q.question) && Array.isArray(q.options) && q.options.length === canonicalArchetypes.length), `Question ${idx + 1} (${q.id}) has ${canonicalArchetypes.length} options`);
    const optionsArchetypes = q.options.map(o => o.archetype).sort();
    const matchesAll = JSON.stringify(optionsArchetypes) === JSON.stringify([...canonicalArchetypes].sort());
    assert(matchesAll, `Question ${idx + 1} options map 1:1 to all ${canonicalArchetypes.length} archetypes`);
  });

  // Simulate scoring function
  canonicalArchetypes.forEach(targetArch => {
    const answers = {
      q1: targetArch,
      q2: targetArch,
      q3: targetArch,
      q4: canonicalArchetypes[(canonicalArchetypes.indexOf(targetArch) + 1) % canonicalArchetypes.length],
      q5: canonicalArchetypes[(canonicalArchetypes.indexOf(targetArch) + 2) % canonicalArchetypes.length]
    };
    const counts = {};
    Object.values(answers).forEach(arch => {
      counts[arch] = (counts[arch] || 0) + 1;
    });
    const winner = Object.keys(counts).reduce((a, b) => (counts[a] >= counts[b] ? a : b), 'explorer');
    assert(winner === targetArch, `Scoring simulation correctly resolves winner "${winner}"`);
  });
}

// ============================================================================
// 6. Ventures Archetype Resonance Matrix
// ============================================================================
function testVenturesMatrix() {
  console.log('\n========================================');
  console.log('6. Ventures Data & Archetype Resonance Matrix');
  console.log('========================================');

  const compassJsonPath = path.join(DATA_DIR, 'compass.json');
  const compass = JSON.parse(fs.readFileSync(compassJsonPath, 'utf8'));
  const canonicalArchetypes = Object.keys(compass.archetypes || {});

  const venturesJsonPath = path.join(DATA_DIR, 'ventures.json');
  assert(fs.existsSync(venturesJsonPath), `ventures.json exists in src/_data`);
  if (!fs.existsSync(venturesJsonPath)) return;

  const ventures = JSON.parse(fs.readFileSync(venturesJsonPath, 'utf8'));
  assert(Array.isArray(ventures) && ventures.length === 3, `ventures.json defines exactly 3 core operating ventures`);

  ventures.forEach((v, idx) => {
    assert(Boolean(v.num && v.title && v.category && v.description && v.link && v.linkLabel), `Venture ${idx + 1} (${v.title}) has all required properties`);
    assert(Boolean(v.resonance && typeof v.resonance === 'object'), `Venture ${idx + 1} has resonance mapping object`);

    canonicalArchetypes.forEach(arch => {
      assert(Boolean(v.resonance && v.resonance[arch] && v.resonance[arch].length > 10), `Venture ${idx + 1} (${v.title}) defines resonance for archetype "${arch}"`);
    });
  });
}

// ============================================================================
// 7. Dynamic CTA Matrix & Archetype Text Integrity
// ============================================================================
function testCtaMatrix() {
  console.log('\n========================================');
  console.log('7. Dynamic CTA Matrix & Archetype Personalization');
  console.log('========================================');

  const compassJsonPath = path.join(DATA_DIR, 'compass.json');
  const compass = JSON.parse(fs.readFileSync(compassJsonPath, 'utf8'));
  const canonicalArchetypes = Object.keys(compass.archetypes || {});

  const ctaJsonPath = path.join(DATA_DIR, 'cta.json');
  assert(fs.existsSync(ctaJsonPath), `cta.json exists in src/_data`);
  if (!fs.existsSync(ctaJsonPath)) return;

  const cta = JSON.parse(fs.readFileSync(ctaJsonPath, 'utf8'));
  const requiredKeys = ['default', ...canonicalArchetypes];

  requiredKeys.forEach(key => {
    const item = cta[key];
    assert(Boolean(item), `CTA matrix defines entry for "${key}"`);
    if (item) {
      assert(Boolean(item.eyebrow && item.heading && item.lead && item.buttonText && item.openThreadPrefix), `CTA key "${key}" contains eyebrow, heading, lead, buttonText, and openThreadPrefix`);
    }
  });
}

// ============================================================================
// 8. Selective Icon Deployment & Tree-Shaker Tests
// ============================================================================
function testSelectiveIconDeployment() {
  console.log('\n========================================');
  console.log('8. Selective Icon Deployment & Tree-Shaker Manifest');
  console.log('========================================');

  const manifestPath = path.join(SITE_DIR, 'assets', 'icons-manifest.json');
  assert(fs.existsSync(manifestPath), `icons-manifest.json exists in _site/assets/`);
  if (!fs.existsSync(manifestPath)) return;

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(typeof manifest.activeIconsCount === 'number' && manifest.activeIconsCount > 0, `icons-manifest.json reports active icons (count: ${manifest.activeIconsCount})`);
  assert(typeof manifest.treeShakenCount === 'number' && manifest.treeShakenCount > 200, `Tree-shaker successfully pruned unused library icons (${manifest.treeShakenCount} pruned, ${manifest.savingsPercentage} payload savings)`);

  // Verify that all active icons in manifest exist in _site/assets/
  Object.keys(manifest.activeIcons || {}).forEach(icon => {
    const iconFile = path.join(SITE_DIR, 'assets', `${icon}.svg`);
    assert(fs.existsSync(iconFile), `Active icon "${icon}.svg" is deployed to _site/assets/`);
  });
}

// ============================================================================
// 9. Minimum Icon Legibility & Sizing Standard (>= 14px)
// ============================================================================
function testMinimumIconSizes() {
  console.log('\n========================================');
  console.log('9. Icon Legibility Standard (Minimum 14px Sizing)');
  console.log('========================================');

  const htmlFiles = getAllFiles(SITE_DIR, '.html');
  const MIN_SIZE = 14;

  htmlFiles.forEach(file => {
    const relPath = path.relative(SITE_DIR, file);
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const imgs = dom.window.document.querySelectorAll('img[src$=".svg"]');

    imgs.forEach(img => {
      const src = img.getAttribute('src') || '';
      if (src.includes('logo.svg')) return;

      const widthAttr = img.getAttribute('width');
      const heightAttr = img.getAttribute('height');

      if (widthAttr && heightAttr) {
        const w = parseInt(widthAttr, 10);
        const h = parseInt(heightAttr, 10);
        assert(
          w >= MIN_SIZE && h >= MIN_SIZE,
          `${relPath} -> Icon "${src}" meets min 14px legibility standard (${w}x${h}px)`
        );
      }
    });
  });
}

// ============================================================================
// Main Test Runner
// ============================================================================
function runAllIntegrityTests() {
  const startTime = Date.now();
  console.log('Starting Site Integrity & Quality Assurance Suite...');

  testJsonLdSchemas();
  testSearchIndex();
  testXmlAndSeo();
  testLinksAndAssets();
  testCompassMatrix();
  testVenturesMatrix();
  testCtaMatrix();
  testSelectiveIconDeployment();
  testMinimumIconSizes();

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('\n========================================');
  console.log(`Site Integrity Summary: ${totalPasses} Passed, ${totalErrors} Failed (${elapsed}s)`);
  console.log('========================================\n');

  if (totalErrors > 0) {
    console.error(`✖ Test suite failed with ${totalErrors} errors!`);
    process.exit(1);
  } else {
    console.log('✓ All Site Integrity, SEO, Schema, and Link Audits Passed Cleanly!');
    process.exit(0);
  }
}

runAllIntegrityTests();

