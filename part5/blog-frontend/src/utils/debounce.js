const debounce = (time, cb) => {
    setTimeout(() => cb(), time);
};

export default debounce;