import { useDispatch } from 'react-redux';
import { filterAnecdote } from '../reducers/filterReducer';

export default function Filter() {
    const dispatch = useDispatch();
    const handleFilterChange = (e) => dispatch(filterAnecdote(e.target.value));

    return (
        <div style={{ marginBottom: '10px' }}>
            filter: <input type='text' onChange={handleFilterChange} />
        </div>
    )
};