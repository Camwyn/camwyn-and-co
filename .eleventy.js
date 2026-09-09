const compassData = require('./src/_data/compass.json');

const { scanAndDeployUsedAssets } = require('./scripts/selective-assets');

module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true,
  });

  // Passthrough copy for CSS, wp-content, and web server configuration
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/wp-content");
  eleventyConfig.addPassthroughCopy({ "src/.htaccess": ".htaccess" });

  // Selective tree-shaking & monitoring for icons and assets
  eleventyConfig.on('eleventy.after', async () => {
    scanAndDeployUsedAssets('src', '_site');
  });

  // Filters
  eleventyConfig.addFilter("readableDate", function(dateObj) {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  eleventyConfig.addFilter("htmlDateString", function(dateObj) {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("readingTime", function(text) {
    if (!text) return "1 min read";
    const words = text.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  });

  eleventyConfig.addFilter("dateToRfc3339", function(dateObj) {
    if (!dateObj) return new Date().toISOString();
    const d = new Date(dateObj);
    return d.toISOString();
  });

  eleventyConfig.addFilter("archetypeTag", function(archetypeId) {
    return compassData.archetypes[archetypeId]?.dispatchTag || "Dispatch";
  });

  eleventyConfig.addFilter("archetypeIcon", function(archetypeId) {
    return compassData.archetypes[archetypeId]?.icon || "compass";
  });

  eleventyConfig.addFilter("archetypeName", function(archetypeId) {
    return compassData.archetypes[archetypeId]?.name || "Adventure Compass";
  });

  eleventyConfig.addFilter("cleanSearchText", function(rawContent) {
    if (!rawContent) return "";
    return rawContent
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/&[a-z0-9#]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  });

  const isFutureDate = (dateVal) => {
    if (!dateVal) return false;
    const postDate = new Date(dateVal);
    if (isNaN(postDate.getTime())) return false;
    const now = new Date();
    const postDateStr = postDate.toISOString().split('T')[0];
    const nowDateStr = now.toISOString().split('T')[0];
    if (postDateStr > nowDateStr) return true;
    if (postDateStr === nowDateStr) {
      return postDate.getTime() > now.getTime() && (postDate.getUTCHours() !== 0 || postDate.getUTCMinutes() !== 0);
    }
    return false;
  };

  const isPublishedNote = (item) => {
    if (process.env.SHOW_DRAFTS === 'true') return true;
    if (item.data && item.data.draft === true) return false;
    const noteDate = item.data?.date || item.date;
    if (noteDate && isFutureDate(noteDate)) return false;
    return true;
  };

  // Collections
  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/notes/*.md")
      .filter(isPublishedNote)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("latestNotesByArchetype", function(collectionApi) {
    const allNotes = collectionApi
      .getFilteredByGlob("src/notes/*.md")
      .filter(isPublishedNote)
      .sort((a, b) => b.date - a.date);
    const archetypes = Object.keys(compassData.archetypes || {});
    const latest = [];

    archetypes.forEach(arch => {
      const match = allNotes.find(item => item.data.archetype === arch);
      if (match) {
        latest.push(match);
      }
    });

    return latest;
  });

  // Configure Markdown parser to automatically open external links in new tab
  const markdownIt = require("markdown-it");
  const markdownLib = markdownIt({
    html: true,
    breaks: false,
    linkify: true
  });

  const defaultRender = markdownLib.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  markdownLib.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const hrefIndex = tokens[idx].attrIndex('href');
    if (hrefIndex >= 0) {
      const href = tokens[idx].attrs[hrefIndex][1];
      if (/^https?:\/\//i.test(href) && !href.includes('camwyn.com') && !href.includes('camwyn-and-co.lndo.site')) {
        tokens[idx].attrPush(['target', '_blank']);
        tokens[idx].attrPush(['rel', 'noopener noreferrer']);
      }
    }
    return defaultRender(tokens, idx, options, env, self);
  };

  // Add slugified IDs to Markdown headings for section deep-linking
  const defaultHeadingRender = markdownLib.renderer.rules.heading_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  markdownLib.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    const nextToken = tokens[idx + 1];
    if (nextToken && nextToken.children) {
      const text = nextToken.children
        .filter(t => t.type === 'text' || t.type === 'code_inline')
        .map(t => t.content)
        .join('');
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      if (slug) {
        tokens[idx].attrSet('id', slug);
      }
    }
    return defaultHeadingRender(tokens, idx, options, env, self);
  };

  eleventyConfig.setLibrary("md", markdownLib);

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site"
    }
  };
};