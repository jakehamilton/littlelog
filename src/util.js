// @ts-check
const range = (min, max, x) => {
    return Math.min(Math.max(x, min), max);
};

const microtask = (f) => {
    setTimeout(f, 0);
};

module.exports = {
    range,
    microtask,
};
