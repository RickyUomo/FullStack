import axios from 'axios';

const baseURL = 'http://localhost:3001/notes';

const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

const createNew = async (content) => {
    const note = { content, important: false };
    const res = await axios.post(baseURL, note);
    return res.data;
};

const toggleImportant = async (id) => {
    const res = await axios.get(`${baseURL}/${id}`),
        noteToChange = res.data;

    await axios.put(`${baseURL}/${id}`, { ...noteToChange, important: !noteToChange.important });
};

const noteService = { getAll, createNew, toggleImportant }

export default noteService;