// projects english
const getProjectsEN = collection => {
  const projects = collection.getFilteredByGlob('./src/en/projects/*.md');
  return projects.reverse();
};

// blog english
const getBlogsEN = collection => {
  const blogs = collection.getFilteredByGlob('./src/en/blog/*.md');
  return blogs.reverse();
};

// projects spanish
const getProjectsFR = collection => {
  const projects = collection.getFilteredByGlob('./src/fr/projects/*.md');
  return projects.reverse();
};

// blog spanish
const getBlogsFR = collection => {
  const blogs = collection.getFilteredByGlob('./src/fr/blog/*.md');
  return blogs.reverse();
};

// projects german
const getProjectsDE = collection => {
  const projects = collection.getFilteredByGlob('./src/de/projects/*.md');
  return projects.reverse();
};

// blog german
const getBlogsDE = collection => {
  const blogs = collection.getFilteredByGlob('./src/de/blog/*.md');
  return blogs.reverse();
};

const getBlogsAllFullLang = collection => {
  return collection
    .getFilteredByGlob('./src/*/blog/*.md')
    .filter(post => post.data.category == 'blogpost');
};

const getBlogsAllLang = collection => {
  return collection.getFilteredByGlob('./src/*/blog/*.md');
};

module.exports = {
  getProjectsEN,
  getBlogsEN,
  getProjectsFR,
  getBlogsFR,
  getProjectsDE,
  getBlogsDE,
  getBlogsAllFullLang,
  getBlogsAllLang
};
