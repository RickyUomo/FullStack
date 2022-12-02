import { useDispatch } from "react-redux";
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createNotification, removeNotification } from '../reducers/notificationReducer';

import anecdoteService from '../service/anecdote';

let hide;

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(createAnecdote(newAnecdote));
        dispatch(createNotification(`You created ${newAnecdote.content}`));
        clearTimeout(hide);
        hide = setTimeout(() => dispatch(removeNotification()), 5000);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    )
};

export default AnecdoteForm;