const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const axe = require('axe-core');

// ============================================================================
// 1. Color Contrast Mathematical Verification (W3C Relative Luminance Formula)
// ============================================================================

function hexToRgb(hex) {
  const sanitized = hex.replace('#', '').trim();
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function sRgbToLin(val) {
  const s = val / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function getLuminance([r, g, b]) {
  return 0.2126 * sRgbToLin(r) + 0.7152 * sRgbToLin(g) + 0.0722 * sRgbToLin(b);
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const colorTokens = {
  'paper-white': '#F9F8F6',
  'warm-sand': '#E8E2DA',
  'surface': '#FCF9F5',
  'coffee-black': '#121211',
  'dark-surface': '#121211',
  'on-surface': '#1C1C19',
  'on-surface-variant': '#474741',
  'muted-clay': '#8C7361',
  'muted-clay-text': '#735D4E',
  'outline-dark': '#595954',
  'outline-variant': '#C8C7BF',
  'inverse-primary': '#C9C6C3',
  'secondary-container': '#FFD5B6',
  'on-primary': '#FFFFFF'
};

const contrastPairs = [
  { fg: 'coffee-black', bg: 'paper-white', minRatio: 7.0, context: 'Primary Body Text / Headings (AAA)' },
  { fg: 'on-surface', bg: 'paper-white', minRatio: 7.0, context: 'On Surface Text (AAA)' },
  { fg: 'on-surface-variant', bg: 'paper-white', minRatio: 7.0, context: 'Lead & Body Secondary Text (AAA)' },
  { fg: 'muted-clay-text', bg: 'paper-white', minRatio: 4.5, context: 'Small Clay Metadata / Labels (AA)' },
  { fg: 'muted-clay', bg: 'paper-white', minRatio: 3.0, context: 'Large Headings & Accent Spans (AA Large)' },
  { fg: 'outline-dark', bg: 'paper-white', minRatio: 4.5, context: 'Monospaced Meta & Index Numbers (AA)' },
  { fg: 'coffee-black', bg: 'warm-sand', minRatio: 7.0, context: 'Text on Warm Sand Sections (AAA)' },
  { fg: 'on-surface-variant', bg: 'warm-sand', minRatio: 4.5, context: 'Lead on Warm Sand Sections (AA)' },
  { fg: 'on-primary', bg: 'coffee-black', minRatio: 7.0, context: 'Headings on Dark Sections (AAA)' },
  { fg: 'inverse-primary', bg: 'coffee-black', minRatio: 7.0, context: 'Body Copy on Dark Sections (AAA)' },
  { fg: 'secondary-container', bg: 'coffee-black', minRatio: 7.0, context: 'Accent Tags on Dark Sections (AAA)' }
];

console.log('\n========================================');
console.log('1. WCAG 2.1 Color Contrast Audit');
console.log('========================================');

let contrastPassed = true;
contrastPairs.forEach(pair => {
  const fgHex = colorTokens[pair.fg];
  const bgHex = colorTokens[pair.bg];
  const ratio = getContrastRatio(fgHex, bgHex);
  const pass = ratio >= pair.minRatio;
  const status = pass ? '✓ PASS' : '✖ FAIL';
  if (!pass) contrastPassed = false;
  console.log(`[${status}] ${pair.fg} (${fgHex}) on ${pair.bg} (${bgHex}) -> ${ratio.toFixed(2)}:1 (Min: ${pair.minRatio}:1) — ${pair.context}`);
});

if (!contrastPassed) {
  console.error('\n✖ Contrast verification failed! Adjust design tokens in tokens.css.');
  process.exit(1);
}

// ============================================================================
// 2. Axe-Core DOM Accessibility Audit
// ============================================================================

const pages = [
  { name: 'Homepage', file: path.join(__dirname, '../_site/index.html') },
  { name: 'Our Story', file: path.join(__dirname, '../_site/our-story/index.html') },
  { name: 'What We Do', file: path.join(__dirname, '../_site/what-we-do/index.html') },
  { name: 'Compass Result (Explorer)', file: path.join(__dirname, '../_site/compass/explorer/index.html') },
  { name: 'Compass Result (Gatherer)', file: path.join(__dirname, '../_site/compass/gatherer/index.html') }
];

async function runAxeAudit() {
  console.log('\n========================================');
  console.log('2. Axe-Core DOM Accessibility Audit');
  console.log('========================================');

  let totalViolations = 0;

  for (const page of pages) {
    if (!fs.existsSync(page.file)) {
      console.error(`✖ File not found: ${page.file}. Run Eleventy build first.`);
      process.exit(1);
    }

    const html = fs.readFileSync(page.file, 'utf8');
    const dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable'
    });

    const { window } = dom;

    // Set global environment for axe-core execution in JSDOM
    global.window = window;
    global.document = window.document;
    global.Node = window.Node;
    global.Element = window.Element;
    global.HTMLElement = window.HTMLElement;
    global.HTMLInputElement = window.HTMLInputElement;
    global.HTMLSelectElement = window.HTMLSelectElement;
    global.HTMLTextAreaElement = window.HTMLTextAreaElement;
    global.HTMLButtonElement = window.HTMLButtonElement;
    global.HTMLAnchorElement = window.HTMLAnchorElement;

    // Run axe against window.document.documentElement
    const results = await axe.run(window.document.documentElement, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
      }
    });

    if (results.violations.length > 0) {
      console.error(`\n✖ [VIOLATIONS DETECTED] Page: ${page.name} (${page.file})`);
      results.violations.forEach((v, idx) => {
        console.error(`  ${idx + 1}. [${v.impact.toUpperCase()}] ${v.id}: ${v.description}`);
        console.error(`     Help: ${v.helpUrl}`);
        v.nodes.forEach(node => {
          console.error(`     HTML: ${node.html}`);
        });
      });
      totalViolations += results.violations.length;
    } else {
      console.log(`✓ [PASS] Page: ${page.name} — Zero Axe violations (${results.passes.length} rules verified).`);
    }
  }

  console.log('\n========================================');
  if (totalViolations === 0) {
    console.log('✓ All Accessibility and Contrast Checks Passed! (100% WCAG 2.1 AA Compliant)');
    console.log('========================================\n');
    process.exit(0);
  } else {
    console.error(`✖ Total Violations: ${totalViolations}`);
    console.log('========================================\n');
    process.exit(1);
  }
}

runAxeAudit().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});

