// @ts-check
const { LEVEL_TO_NUMBER, NUMBER_TO_LEVEL } = require('./config');

const range = (min, max, x) => {
    return Math.min(Math.max(x, min), max);
};

const microtask = (f) => {
    setTimeout(f, 0);
};

/**
 * Get the log level name for a given number.
 * @param {number} level
 */
const getLevelFromNumber = (level = 0) => {
    if (NUMBER_TO_LEVEL.hasOwnProperty(level)) {
        return NUMBER_TO_LEVEL[level];
    } else {
        return NUMBER_TO_LEVEL[0];
    }
};

/**
 * Get the number for a given log level name.
 * @param {string} name
 */
const getNumberFromLevel = (name = 'SILENT') => {
    if (name && LEVEL_TO_NUMBER.hasOwnProperty(name)) {
        return LEVEL_TO_NUMBER[name];
    } else {
        return LEVEL_TO_NUMBER[0];
    }
};

module.exports = {
    range,
    microtask,
    getLevelFromNumber,
    getNumberFromLevel,
};
