const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const OG_DIR = path.join(__dirname, '../src/assets/og');

function generateOgPngs() {
  if (!fs.existsSync(OG_DIR)) {
    console.error('OG directory does not exist:', OG_DIR);
    return;
  }

  const files = fs.readdirSync(OG_DIR).filter(f => f.endsWith('.svg'));
  console.log(`Generating high-resolution Open Graph PNGs from ${files.length} SVGs...`);

  files.forEach(file => {
    const svgPath = path.join(OG_DIR, file);
    const pngName = file.replace(/\.svg$/, '.png');
    const pngPath = path.join(OG_DIR, pngName);

    const svgContent = fs.readFileSync(svgPath, 'utf8');

    const resvg = new Resvg(svgContent, {
      fitTo: {
        mode: 'width',
        value: 1200,
      },
      font: {
        loadSystemFonts: true,
        defaultFontFamily: 'sans-serif',
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    fs.writeFileSync(pngPath, pngBuffer);
    console.log(`  [✓] Generated ${pngName} (${pngBuffer.length} bytes, 1200x630)`);
  });

  console.log('✓ All Open Graph PNG assets successfully generated!\n');
}

if (require.main === module) {
  generateOgPngs();
}

module.exports = { generateOgPngs };
