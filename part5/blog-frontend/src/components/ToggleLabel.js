import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types'

const ToggleLabel = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(true);
    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => setVisible(!visible);

    useImperativeHandle(ref, () => {
        return { toggleVisibility }; // returning an object for current property
    });

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
});

ToggleLabel.propTypes = {
    cancelBtn: PropTypes.string.isRequired,
    newBlogBtn: PropTypes.string.isRequired,
};

export default ToggleLabel;