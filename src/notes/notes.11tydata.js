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

const isDraftOrScheduled = (data) => {
  if (process.env.SHOW_DRAFTS === 'true') return false;
  if (data.draft === true) return true;
  if (data.date && isFutureDate(data.date)) return true;
  return false;
};

module.exports = {
  layout: "note.njk",
  tags: ["note"],
  eleventyComputed: {
    pageTitle: (data) => `${data.title} — Notes from the Field | ${data.site.name}`,
    permalink: (data) => {
      if (isDraftOrScheduled(data)) {
        return false;
      }
      return `/notes/${data.page.fileSlug}/index.html`;
    },
    eleventyExcludeFromCollections: (data) => {
      return isDraftOrScheduled(data);
    }
  }
};
