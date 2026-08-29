const fs = require('fs');
const path = require('path');

function scanAndDeployUsedAssets(srcDir = 'src', outDir = '_site') {
  const assetsDir = path.join(srcDir, 'assets');
  const targetAssetsDir = path.join(outDir, 'assets');

  if (!fs.existsSync(assetsDir)) return;

  if (!fs.existsSync(targetAssetsDir)) {
    fs.mkdirSync(targetAssetsDir, { recursive: true });
  }

  // 1. Get all available SVGs in src/assets
  const allSvgs = fs.readdirSync(assetsDir)
    .filter(f => f.endsWith('.svg'))
    .map(f => path.basename(f, '.svg'));

  const usedIcons = new Map();

  // Always include essential branding & favicon
  const essentials = ['logo', 'favicon', 'question'];
  essentials.forEach(icon => {
    if (allSvgs.includes(icon)) {
      usedIcons.set(icon, ['system:essential']);
    }
  });

  // 2. Scan all JSON data files in src/_data
  const dataDir = path.join(srcDir, '_data');
  if (fs.existsSync(dataDir)) {
    const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    dataFiles.forEach(dataFile => {
      try {
        const jsonContent = JSON.parse(fs.readFileSync(path.join(dataDir, dataFile), 'utf8'));
        
        function crawlJson(obj) {
          if (!obj) return;
          if (typeof obj === 'string') {
            const clean = obj.replace('.svg', '').trim();
            if (allSvgs.includes(clean)) {
              const current = usedIcons.get(clean) || [];
              if (!current.includes(`src/_data/${dataFile}`)) {
                current.push(`src/_data/${dataFile}`);
              }
              usedIcons.set(clean, current);
            }
          } else if (Array.isArray(obj)) {
            obj.forEach(crawlJson);
          } else if (typeof obj === 'object') {
            for (const [k, v] of Object.entries(obj)) {
              if (k === 'icon' && typeof v === 'string') {
                const clean = v.replace('.svg', '').trim();
                if (allSvgs.includes(clean)) {
                  const current = usedIcons.get(clean) || [];
                  if (!current.includes(`src/_data/${dataFile} (key: ${k})`)) {
                    current.push(`src/_data/${dataFile} (key: ${k})`);
                  }
                  usedIcons.set(clean, current);
                }
              }
              crawlJson(v);
            }
          }
        }
        crawlJson(jsonContent);
      } catch(e) {}
    });
  }

  // 3. Scan all templates, markdown, CSS, and JS source files
  function getSourceFiles(dir, extensions = ['.njk', '.md', '.js', '.css', '.html']) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '_site' && entry.name !== '.git') {
          files = files.concat(getSourceFiles(fullPath, extensions));
        }
      } else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const filesToScan = getSourceFiles(srcDir).filter(f => !f.startsWith(assetsDir));

  filesToScan.forEach(filePath => {
    const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf8');

    allSvgs.forEach(icon => {
      const regexExact = new RegExp(`(?:/assets/|assets/|["'/])${icon}\\.(?:svg|png|jpg)`, 'i');
      const regexProperty = new RegExp(`['"]${icon}['"]`, 'i');

      if (regexExact.test(content) || (regexProperty.test(content) && (content.includes('archetypeIcons') || content.includes('archetypeTags') || content.includes('icon')))) {
        const current = usedIcons.get(icon) || [];
        if (!current.includes(relPath)) {
          current.push(relPath);
        }
        usedIcons.set(icon, current);
      }
    });
  });

  // 4. Clean out any unused SVGs from target directory
  if (fs.existsSync(targetAssetsDir)) {
    const existingTargetSvgs = fs.readdirSync(targetAssetsDir).filter(f => f.endsWith('.svg'));
    existingTargetSvgs.forEach(f => {
      const iconName = path.basename(f, '.svg');
      if (!usedIcons.has(iconName)) {
        fs.unlinkSync(path.join(targetAssetsDir, f));
      }
    });
  }

  // 5. Copy ONLY the used SVGs into _site/assets/
  let copiedCount = 0;
  for (const icon of usedIcons.keys()) {
    const srcFile = path.join(assetsDir, `${icon}.svg`);
    const destFile = path.join(targetAssetsDir, `${icon}.svg`);
    if (fs.existsSync(srcFile)) {
      try {
        fs.writeFileSync(destFile, fs.readFileSync(srcFile));
        copiedCount++;
      } catch (err) {
        console.warn(`[Icon Monitor] Warning: Could not write ${destFile}:`, err.message);
      }
    }
  }

  // 6. Copy non-SVG subdirectories (e.g. src/assets/og)
  const ogSrcDir = path.join(assetsDir, 'og');
  const ogDestDir = path.join(targetAssetsDir, 'og');
  if (fs.existsSync(ogSrcDir)) {
    if (!fs.existsSync(ogDestDir)) {
      fs.mkdirSync(ogDestDir, { recursive: true });
    }
    const ogFiles = fs.readdirSync(ogSrcDir);
    ogFiles.forEach(f => {
      try {
        fs.writeFileSync(path.join(ogDestDir, f), fs.readFileSync(path.join(ogSrcDir, f)));
      } catch (err) {
        console.warn(`[Icon Monitor] Warning: Could not write ${f}:`, err.message);
      }
    });
  }

  // 7. Write manifest report
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalAvailableIcons: allSvgs.length,
    activeIconsCount: usedIcons.size,
    treeShakenCount: allSvgs.length - usedIcons.size,
    savingsPercentage: `${(((allSvgs.length - usedIcons.size) / allSvgs.length) * 100).toFixed(1)}%`,
    activeIcons: Object.fromEntries(usedIcons)
  };

  fs.writeFileSync(path.join(targetAssetsDir, 'icons-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`[Icon Monitor] 📦 Deployed ${copiedCount} active icons to ${targetAssetsDir} (tree-shook ${allSvgs.length - copiedCount} unused icons, ${manifest.savingsPercentage} payload reduction)`);
  return manifest;
}

if (require.main === module) {
  scanAndDeployUsedAssets();
}

module.exports = { scanAndDeployUsedAssets };
