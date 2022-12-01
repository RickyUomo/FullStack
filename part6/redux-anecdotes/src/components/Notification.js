import { useSelector } from "react-redux";

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const notification = useSelector(state => {
    console.log(state)
  })

  return (
    <div style={style}>
      render here notification...
    </div>
  )
}

export default Notification