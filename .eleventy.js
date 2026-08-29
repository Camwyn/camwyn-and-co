const compassData = require('./src/_data/compass.json');

const archetypeTags = {
  gatherer: 'Table note',
  craftsman: 'Workbench',
  explorer: 'Dispatch',
  catalyst: 'Collaboration',
  storykeeper: 'Chronicle'
};

module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true,
  });

  // Passthrough copy for CSS and asset files
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/wp-content");

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

  eleventyConfig.addFilter("archetypeTag", function(archetypeId) {
    return archetypeTags[archetypeId] || "Dispatch";
  });

  eleventyConfig.addFilter("archetypeIcon", function(archetypeId) {
    return compassData.archetypes[archetypeId]?.icon || "compass";
  });

  eleventyConfig.addFilter("archetypeName", function(archetypeId) {
    return compassData.archetypes[archetypeId]?.name || "Adventure Compass";
  });

  // Collections
  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/notes/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("latestNotesByArchetype", function(collectionApi) {
    const allNotes = collectionApi.getFilteredByGlob("src/notes/*.md").sort((a, b) => b.date - a.date);
    const archetypes = ['gatherer', 'craftsman', 'explorer', 'catalyst', 'storykeeper'];
    const latest = [];

    archetypes.forEach(arch => {
      const match = allNotes.find(item => item.data.archetype === arch);
      if (match) {
        latest.push(match);
      }
    });

    return latest;
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site"
    }
  };
};