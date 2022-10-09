const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = blogs => {
  if (!blogs.length) return 0;
  const reducer = (sum, item) => {
    return sum + item.likes;
  }

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  if (!blogs.length) return null;

  let max = 0;
  let result = {};
  blogs.forEach(item => {
    if (item.likes >= max) result = item;
  });

  return result;
};

const mostBlogs = blogs => {
  if (!blogs.length) return null;

  const groupedAuthor = _.groupBy(blogs, 'author');

  let max = 0,
    author = '';
  _.each(groupedAuthor, (item, name) => {
    if (item.length >= max) {
      max = item.length;
      author = name;
    }
  });

  return { author: author, blogs: max };
};

const mostLikes = blogs => {
  if (!blogs.length) return null;

  const groupedAuthor = _.groupBy(blogs, 'author');

  let max = 0,
    author = '';
  _.each(groupedAuthor, (item, name) => {
    const sumLikes = _.sumBy(item, 'likes');
    if (sumLikes >= max) {
      max = sumLikes;
      author = name;
    }
  });

  return { author: author, likes: max };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};