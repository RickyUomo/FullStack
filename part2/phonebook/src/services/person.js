import axios from 'axios';

const baseURL = '/api/persons';

const getAll = () => {
    const response = axios.get(baseURL);
    return response.then(res => res.data);
}

const create = (newObj) => {
    const response = axios.post(baseURL, newObj);
    return response.then(res => res.data);
}

const deletePerson = (id) => {
    const res = axios.delete(`${baseURL}/${id}`);

    return res.then(res => {
        return res.data
    });
}

const personService = { getAll, create, deletePerson };

export default personService;