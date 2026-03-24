/// <reference types="vitest/config" />
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const isCI = Boolean(process.env['CI']);
const __dirname = import.meta.dirname;

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
        },
        clearMocks: true,
        coverage: {
            enabled: true,
            exclude: ['**/index.ts', 'main.ts', '**/config/*.ts'],
            provider: 'v8',
            reporter: ['text-summary', ['html', { subdir: '.' }]],
            reportOnFailure: true,
            reportsDirectory: 'coverage/amsterdam-events',
            thresholds: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        },
        globals: true,
        name: 'amsterdam-events',
        open: false,
        passWithNoTests: true,
        reporters: [
            'dot',
            ['html', { outputFile: 'reports/amsterdam-events/index.html' }],
            ...(isCI ? ['github-actions'] : []),
        ],
        root: __dirname,
        sequence: {
            shuffle: true,
        },
    },
});
