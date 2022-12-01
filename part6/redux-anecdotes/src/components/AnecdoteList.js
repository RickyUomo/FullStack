import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { createNotification, removeNotification } from '../reducers/notificationReducer';

let hide; // sanitize the timer before a new one register

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes }) => anecdotes);
    const filters = useSelector(({ filters }) => filters);
    const dispatch = useDispatch();

    return (
        <div>
            {
                [...anecdotes]
                    .filter(a => a.content.toLowerCase().indexOf(filters.toLowerCase()) !== -1)
                    .sort((a1, a2) => a2.votes - a1.votes)
                    .map(anecdote =>
                    (
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => {
                                    dispatch(voteAnecdote(anecdote.id));
                                    dispatch(createNotification(`You voted ${anecdote.content}`));

                                    clearTimeout(hide);
                                    hide = setTimeout(() => dispatch(removeNotification()), 5000);
                                }}>vote</button>
                            </div>
                        </div>
                    )
                    )
            }
        </div>
    )
};

export default AnecdoteList;