const Notification = ({ message }) => {
    const errorStyle = {
        "color": "red"
    };

    const createdStyle = {
        "color": "green"
    };

    return (
        <div>
            <h4 style={message.error ? errorStyle : createdStyle}>{message.content}</h4>
        </div>
    );
};

export default Notification;