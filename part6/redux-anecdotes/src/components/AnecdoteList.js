import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes }) => anecdotes);
    const dispatch = useDispatch();

    return (
        <div>
            {
                [...anecdotes].sort((a1, a2) => a2.votes - a1.votes).map(anecdote =>
                (
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
                        </div>
                    </div>
                )
                )
            }
        </div>
    )
};

export default AnecdoteList;