import { useSelector, useDispatch } from "react-redux";
import { toggleImportant } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
};

const Notes = (props) => {
    const dispatch = useDispatch();
    const notes = useSelector(state => {
        // console.log(['state'], state);
        return state;
    });

    const toggleImportance = (id) => {
        dispatch(toggleImportant(id));
    };

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    handleClick={toggleImportance}
                    note={note}
                />
            )}
        </ul>
    )
};

export default Notes;