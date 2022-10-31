import { useState } from "react";

const ToggleLabel = (props) => {
    const [visible, setVisible] = useState(true);
    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => setVisible(!visible);

    return (
        <div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>{props.newBlogBtn}</button>
            </div>
            <div style={hideWhenVisible} >
                {props.children}
                <button onClick={toggleVisibility}>{props.cancelBtn}</button>
            </div>
        </div>
    );
};

export default ToggleLabel;