import { useState } from "react";
import Button from './Button';
import blogService from '../services/blogs';

const Blog = ({ blog, onDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const [visible, setVisible] = useState(false);
  const [, blogChanged] = useState();

  const handleClick = () => setVisible(!visible);

  const addLike = async () => {
    blog.likes += 1;
    const newBlog = await blogService.update(blog.id, blog);
    blogChanged(newBlog);
  };

  const deleteBlog = async () => {
    const choice = window.confirm(`Remove ${blog.title} by ${blog.author}`);
    if (!choice) return;
    await blogService.remove(blog.id);
    onDelete(blog.id);
  };

  const showAll = () => (
    <>
      <p>Title: {blog.title} <Button handleClick={handleClick} name={visible ? 'hide' : 'view'} /></p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes} <Button handleClick={addLike} name={"like"} /></p>
      <p>Author: {blog.author}</p>
      <Button handleClick={deleteBlog} name={'remove'} />
    </>
  );

  const showLess = () => (
    <>
      <p>Title: {blog.title} <Button handleClick={handleClick} name={visible ? 'hide' : 'view'} /></p>
      <p>Author: {blog.author}</p>
    </>
  );

  return (
    <div className={"blog"} style={blogStyle}>
      {visible ? showAll() : showLess()}
    </div>
  );
};

export default Blog;