import { useDispatch } from "react-redux";
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createNotification, removeNotification } from '../reducers/notificationReducer';

let hide;

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdote(content));
        dispatch(createNotification(`You created ${content}`));
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