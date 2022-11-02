import { useState, useEffect, useRef } from 'react';
import React from 'react'

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import ToggleLabel from './components/ToggleLabel';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';
import moment from 'moment';
import debounce from './utils/debounce';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});
  const blogFormRef = useRef(); // it is an object with a current property

  useEffect(() => { // call it later after performing the DOM updates
    const expired = window.localStorage.getItem('expiredTime');
    const now = +moment();
    if (expired && now > expired) handleLogout();

    blogService.getAll()
      .then(blogs => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser');
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, [])

  const login = async (loginObj) => {
    try {
      const user = await loginService.login(loginObj);
      const endtTime = +moment().add(1, 'hour');
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      window.localStorage.setItem('expiredTime', JSON.stringify(endtTime));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setMessage({ error: true, content: 'Wrong Credentials' });
      debounce(5000, () => setMessage({}));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    setUser(null);
    setBlogs([]);
  };

  const createBlog = async (newBlogObj) => {
    try {
      const returnedBlogs = await blogService.create(newBlogObj);
      setBlogs(blogs.concat(returnedBlogs)); // dont't modify the original blogs array
      setMessage({ error: false, content: `${newBlogObj.title} by ${newBlogObj.author} created!` });

      blogFormRef.current.toggleVisibility();

      debounce(5000, () => setMessage({}));
    } catch (error) {
      setMessage({ error: true, content: 'Fail created blog' });
      console.log(['error'], error);
      debounce(5000, () => setMessage({}));
    }
  };

  return (
    <div>
      <React.StrictMode>
        <h2>blogs</h2>
        <div>
          <Notification message={message} />
        </div>

        {
          user === null
            ? <LoginForm login={login} />
            : <div>
              <p>{user.username} logged-in <LogoutForm handleLogout={handleLogout} /></p>
              <ToggleLabel cancelBtn="cancel" newBlogBtn="new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
              </ToggleLabel>
            </div>
        }

        {blogs?.length && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </React.StrictMode>
    </div>
  );
};

export default App;
