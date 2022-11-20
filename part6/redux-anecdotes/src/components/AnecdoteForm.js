import { useDispatch } from "react-redux";
import { newAnecdoteCreator } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createNewAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(newAnecdoteCreator(content));
    };

    return (
        <form onSubmit={createNewAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    )
};

export default AnecdoteForm;