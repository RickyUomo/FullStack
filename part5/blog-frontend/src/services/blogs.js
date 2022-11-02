import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;
let config = {};

const setToken = newToken => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token }
  };
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const blogService = { setToken, getAll, create, update, remove };
export default blogService;