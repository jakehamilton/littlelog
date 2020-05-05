const log = require('../src');

try {
    log.setVerbosity('TRACE');
    log.info('This is an info log.');
    log.debug('This is a debug log.');
    log.trace('This is a trace log.');
} catch (error) {
    console.error('An unexpected error occurred.');
    console.log(error);
}
