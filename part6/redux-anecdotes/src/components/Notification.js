import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const notifications = useSelector(({ notifications }) => notifications);

  return (
    <div style={notifications === '' ? null : style}>
      {notifications}
    </div>
  )
};

export default Notification;