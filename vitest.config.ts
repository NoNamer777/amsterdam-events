import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        browser: {
            provider: playwright(),
            screenshotFailures: false,
        },
        clearMocks: true,
        coverage: {
            provider: 'v8',
            reportOnFailure: true,
        },
        globals: true,
        name: 'amsterdam-events',
        open: false,
        root: import.meta.dirname,
        sequence: {
            shuffle: true,
        },
    },
});
