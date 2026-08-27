module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 8080,
    showAllHosts: true,
  });

  // Passthrough copy for CSS and asset files
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};