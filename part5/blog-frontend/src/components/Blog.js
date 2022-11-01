import { useState } from "react";
import Button from './Button';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const showAll = () => (
    <>
      <p>Title: {blog.title} <Button handleClick={handleClick} name={visible ? 'hide' : 'view'} /></p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes} <Button name={"like"} /></p>
      <p>Author: {blog.author}</p>
    </>
  );

  const showLess = () => (
    <>
      <p>Title: {blog.title} <Button handleClick={handleClick} name={visible ? 'hide' : 'view'} /></p>
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