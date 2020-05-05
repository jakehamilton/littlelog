// @ts-check
const chalk = require('chalk');

const util = require('./util');
const config = require('./config');

/**
 * @typedef {import('./config')} LogLevels
 */

/**
 * @typedef {keyof LogLevels} LogLevelKey
 */

/**
 * Get the prefix for a log.
 *
 * @param {LogLevels['SILENT'] | LogLevels['INFO'] | LogLevels['DEBUG'] | LogLevels['TRACE']} level
 * @returns {string} prefix
 */
const getLogPrefix = (level) => {
    switch (level) {
        case 0:
            return '';
        case 1:
            return chalk`{blueBright.bold [INFO]} `;
        case 2:
            return chalk`{yellow.bold [DEBUG]} `;
        case 3:
            return chalk`{bold [TRACE]} `;
    }
};

/**
 * Get the current verbosity set on `process.env.LOG_LEVEL`
 * @param {LogLevelKey | string} name
 * @returns {LogLevels['SILENT'] | LogLevels['INFO'] | LogLevels['DEBUG'] | LogLevels['TRACE']}
 */
const getVerbosity = (name) => {
    switch (name) {
        default:
        case 'SILENT':
            return config.SILENT;
        case 'INFO':
            return config.INFO;
        case 'DEBUG':
            return config.DEBUG;
        case 'TRACE':
            return config.TRACE;
    }
};

/**
 * @type {LogLevels['SILENT'] | LogLevels['INFO'] | LogLevels['DEBUG'] | LogLevels['TRACE']}
 */
let verbosity = getVerbosity(process.env.LOG_LEVEL);

/**
 * Create an info logger for a log level.
 *
 * @param {LogLevelKey} name
 * @returns {void}
 */
const setVerbosity = (name) => {
    verbosity = getVerbosity(name);
};

/**
 * Create an info logger for a log level.
 *
 * @param {LogLevels['SILENT'] | LogLevels['INFO'] | LogLevels['DEBUG'] | LogLevels['TRACE']} level
 */
const logger = (level) => {
    /**
     * Log a message to stdout.
     *
     * @param {string} message
     */
    const logger = (message) => {
        if (verbosity >= level) {
            console.log(chalk`${getLogPrefix(level)}${message}`);
        }
    };

    return logger;
};

module.exports = {
    getVerbosity,
    setVerbosity,
    info: logger(1),
    debug: logger(2),
    trace: logger(3),
};
