import { useSelector, useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../service/note";

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
};

const Notes = () => {
    const dispatch = useDispatch();
    const notes = useSelector(({ notes, filter }) => {
        if (filter === 'ALL') return notes;

        return filter === 'IMPORTANT'
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important);
    });

    const handleClick = async (id) => {
        await noteService.toggleImportant(id);
        dispatch(toggleImportanceOf(id))
    };

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    handleClick={() => handleClick(note.id)}
                    note={note}
                />
            )}
        </ul>
    )
};

export default Notes;