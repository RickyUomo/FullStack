import { useState, useEffect } from 'react';
import Blog from './components/Blog';
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
  const [newBlog, setNewBlog] = useState({});
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationStyle, setNotificationStyle] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const expired = window.localStorage.getItem('expiredTime');
    const now = +moment();
    if (expired && now > expired) handleLogout();

    blogService.getAll()
      .then(response => {
        if (response.length) setBlogs(response);
        else {
          setNotification(response.message);
          setNotificationStyle(errorStyle);
        }
      });
  }, [user, newBlog]);

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
  };

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      const createdBlog = { title, author, url };
      await blogService.create(createdBlog);
      setNewBlog(createdBlog);
      setNotification(`${title} by ${author} created!`)
      setNotificationStyle(createdStyle);
      setTitle('');
      setAuthor('');
      setUrl('');

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const logoutForm = () => (
    <button onClick={handleLogout}>Log Out</button>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  );


  return (
    <div>
      <h2>blogs</h2>
      <div>
        <h4 style={notificationStyle}>{notification}</h4>
      </div>

      {
        user === null
          ? loginForm() :
          <div>
            <p>{user.username} logged-in {logoutForm()}</p>
            {blogForm()}
          </div>
      }

      {blogs?.length && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
};

export default App;
