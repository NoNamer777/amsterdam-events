'use strict';
const fallback = require('connect-history-api-fallback');

function getChromeNamePerOS() {
    return process.platform === 'win32' ? 'chrome' : 'google chrome';
}

module.exports = {
    browser: getChromeNamePerOS(),
    host: '0.0.0.0',
    injectChanges: false,
    notify: false,
    logConnections: false,
    logFileChanges: true,
    open: true,
    port: 4200,
    reloadOnRestart: true,
    server: {
        baseDir: './dist/amsterdam-events',
        middleware: [
            fallback({
                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
                index: '/index.html',
            }),
        ],
    },
    single: true,
    watch: true,
    watchOptions: {
        ignored: 'node_modules',
    },
};
