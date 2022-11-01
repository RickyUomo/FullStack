import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const showAll = () => (
    <>
      <p>Title: {blog.title} <button onClick={handleClick}>{visible ? 'hide' : 'view'}</button></p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>Author: {blog.author}</p>
    </>
  );

  const showLess = () => (
    <>
      <p>Title: {blog.title} <button onClick={handleClick}>{visible ? 'hide' : 'view'}</button></p>
      <p>Author: {blog.author}</p>
    </>
  );

  return (
    <div>
      {visible ? showAll() : showLess()}

    </div>
  );
};

export default Blog;