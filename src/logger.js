// @ts-check
const chalk = require('chalk');

const util = require('./util');

/**
 * @typedef {import('./config')} Config
 */

/**
 * @typedef {keyof Config['LEVEL_TO_NUMBER']} LogLevelName
 */

/**
 * @typedef {keyof Config['NUMBER_TO_LEVEL']} LogLevelNumber
 */

/**
 * Get the prefix for a log.
 *
 * @param {LogLevelName | "WARN"} name
 * @returns {string} prefix
 */
const getLogPrefix = (name, prefix) => {
    const userPrefix = prefix ? `[${prefix}]` : '';

    switch (name) {
        case 'SILENT':
            return '';
        case 'INFO':
            return chalk`{blueBright.bold ${userPrefix}[INFO]} `;
        case 'WARN':
            return chalk`{yellow.bold ${userPrefix}[WARN]} `;
        case 'DEBUG':
            return chalk`{bold ${userPrefix}[DEBUG]} `;
        case 'TRACE':
            return chalk`{dim.bold ${userPrefix}[TRACE]} `;
    }
};

/**
 * Get the verbosity for a log level.
 * @param {LogLevelName} name
 * @returns {LogLevelNumber}
 */
const getVerbosity = util.getNumberFromLevel;

/**
 * @type {LogLevelNumber}
 */
let verbosity;

if (process && process.env) {
    // Expecting node environment.
    // @ts-ignore
    verbosity = util.getNumberFromLevel(process.env.LOG_LEVEL);
} else if (window) {
    // Expecting browser environment.
    // @ts-ignore
    verbosity = util.getNumberFromLevel(window.LOG_LEVEL);
}

/**
 * Create an info logger for a log level.
 *
 * @param {LogLevelName | LogLevelNumber} name
 * @returns {void}
 */
const setVerbosity = (name) => {
    if (typeof name === 'number') {
        // @ts-ignore
        verbosity = Math.max(Math.min(name, 3), 0);
    } else {
        verbosity = util.getNumberFromLevel(name);
    }
};

/**
 * Create an info logger for a log level.
 *
 * @param {LogLevelName | "WARN"} name
 */
const logger = (name, prefix = '') => {
    const level = util.getNumberFromLevel(name === 'WARN' ? 'INFO' : name);

    /**
     * Log a message to stdout.
     *
     * @param {string} message
     */
    const logger = (message) => {
        if (verbosity >= level) {
            console.log(chalk`${getLogPrefix(name, prefix)}${message}`);
        }
    };

    return logger;
};

/**
 * Create logging functions with a prefix.
 * @param {string} prefix
 */
const create = (prefix = '') => {
    return {
        info: logger('INFO', prefix),
        warn: logger('WARN', prefix),
        debug: logger('DEBUG', prefix),
        trace: logger('TRACE', prefix),
    };
};

module.exports = {
    getVerbosity,
    setVerbosity,
    info: logger('INFO'),
    warn: logger('WARN'),
    debug: logger('DEBUG'),
    trace: logger('TRACE'),
    create: create,
};
