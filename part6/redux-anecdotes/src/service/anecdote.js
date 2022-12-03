import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const createNew = async (content) => {
    const res = await axios.post(baseUrl, { content, "votes": 0 });
    return res.data;
};

const vote = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`),
        anecdote = res.data,
        changedAnecdote = await axios.put(`${baseUrl}/${id}`, { ...anecdote, votes: anecdote.votes + 1 });
    return changedAnecdote.data;
}

const anecdoteService = { getAll, createNew, vote };
export default anecdoteService;