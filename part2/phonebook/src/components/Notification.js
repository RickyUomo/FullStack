var _ = require('lodash');
const Notification = ({ message }) => {
    const fail = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 25,
        border: '5px red solid'
    }
    const success = {
        color: 'blue',
        fontStyle: 'italic',
        fontSize: 25
    }
    if (_.isEmpty(message)) return null;

    return (
        <div style={message.error ? fail : success}>
            {message.content}
        </div>
    )
}

export default Notification;