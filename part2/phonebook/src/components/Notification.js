const Notification = ({ message }) => {
    const fail = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 25,
    }
    const success = {
        color: 'blue',
        fontStyle: 'italic',
        fontSize: 25,
    }
    if (message === null) return null;

    return (
        <div style={message.error ? fail : success}>
            {message.content}
        </div>
    )
}

export default Notification;