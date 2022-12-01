import { useDispatch } from "react-redux";
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const createNewAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdote(content));
    };

    return (
        <form onSubmit={createNewAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    )
};

export default AnecdoteForm;