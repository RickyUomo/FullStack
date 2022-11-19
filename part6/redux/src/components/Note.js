import { useSelector, useDispatch } from "react-redux";
import { toggleImportant } from "../reducers/noteReducer";

const Note = (props) => {
    const dispatch = useDispatch();
    const notes = useSelector(state => {
        console.log(['state'], state);
        return state;
    });

    const toggleImportance = (id) => {
        dispatch(toggleImportant(id));
    };

    return (
        <ul>
            {notes.map(note =>
                <li
                    key={note.id}
                    onClick={() => toggleImportance(note.id)}
                >
                    {note.content} <strong>{note.important ? 'important' : ''}</strong>
                </li>
            )}
        </ul>
    )
};

export default Note;