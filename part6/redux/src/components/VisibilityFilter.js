import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from "react-redux";

export default function VisibilityFilter() {
    const dispatch = useDispatch();

    return (
        <div>
            All
            <input type='radio' name='filter' onChange={() => dispatch(filterChange('ALL'))} />
            Important
            <input type='radio' name='filter' onChange={() => dispatch(filterChange('IMPORTANT'))} />
            Non-important
            <input type='radio' name='filter' onChange={() => dispatch(filterChange('NONIMPORTANT'))} />
        </div>
    )
};