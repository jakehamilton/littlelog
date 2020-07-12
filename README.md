<p align="center">
  <img src="./assets/littlelog.png" width="400">
</p>

# LittleLog

> A simple logging utility.

## Installation

Install using your favorite package manager:

```shell
# using npm
npm install --save @littlethings/log

# using yarn
yarn add @littlethings/log
```

## Usage

To configure the logging verbosity (defaults to `process.env.LOG_LEVEL`):

```js
const log = require('@littlethings/log');

/*
 * Possible values are:
 * - SILENT
 * - INFO
 * - DEBUG
 * - TRACE
 */
log.setVerbosity('INFO');
```

To log messages:

```js
const log = require('@littlethings/log');

log.info('This is an info log.');

log.debug('This is a debug log.');

log.trace('This is a trace log.');

log.error('This is an error log.');
```

Logs can be prefixed by creating a new logger.

```js
const { create } = require('@littlethings/log');

const log = create('my-app');

log.info('This is an info log.');

log.debug('This is a debug log.');

log.trace('This is a trace log.');

log.error('This is an error log.');
```
