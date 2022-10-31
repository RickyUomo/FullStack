import { useState, useEffect } from 'react';
import React from 'react'
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import ToggleLabel from './components/ToggleLabel';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import moment from 'moment';

const errorStyle = {
  "color": "red"
};

const createdStyle = {
  "color": "green"
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState(null);

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

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      const endtTime = +moment().add(1, 'hour');
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      window.localStorage.setItem('expiredTime', JSON.stringify(endtTime));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification('Wrong Credentials');
      setNotificationStyle(errorStyle);
      setTimeout(() => {
        setNotification(null);
        setNotificationStyle(null);
      }, 5000);
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
      console.log(['returnedBlogs'], returnedBlogs);
      setBlogs(blogs.concat(returnedBlogs)); // dont't modify the original blogs array
      setNotification(`${newBlogObj.title} by ${newBlogObj.author} created!`);
      setNotificationStyle(createdStyle);

      setTimeout(() => {
        setNotification(null);
        setNotificationStyle(null);
      }, 5000);

    } catch (error) {
      setNotification('Fail created blog');
      setNotificationStyle(errorStyle);
      setTimeout(() => {
        setNotification(null);
        setNotificationStyle(null);
      }, 5000);
    }
  };

  return (
    <div>
      <React.StrictMode>
        <h2>blogs</h2>
        <div>
          <h4 style={notificationStyle}>{notification}</h4>
        </div>

        {
          user === null
            ? <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            /> :
            <div>
              <p>{user.username} logged-in <LogoutForm handleLogout={handleLogout} /></p>
              <ToggleLabel cancelBtn="cancel" newBlogBtn="new blog">
                <BlogForm createBlog={createBlog} />
              </ToggleLabel>
            </div>
        }

        {blogs?.length && blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </React.StrictMode>
    </div>
  )
};

export default App;
