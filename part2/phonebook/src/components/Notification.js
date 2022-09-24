const Notification = ({ message }) => {
    const error = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 25,
    }
    if (message === null) return null;

    console.log(error);
    return (
        <div style={error}>
            {message}
        </div>
    )
}

export default Notification;