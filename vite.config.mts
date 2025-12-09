/// <reference types="vitest/config" />
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const isCI = Boolean(process.env['CI']);
const __dirname = import.meta.dirname;

export default defineConfig({
    plugins: [angular(), viteTsConfigPaths()],
    test: {
        allowOnly: !isCI,
        browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
            ui: true,
        },
        clearMocks: true,
        coverage: {
            clean: true,
            cleanOnRerun: true,
            enabled: true,
            include: ['src/**/*.ts'],
            exclude: ['**/index.ts', 'main.ts'],
            provider: 'v8',
            reporter: ['text-summary', ['html', { subdir: 'coverage' }]],
            reportOnFailure: true,
            reportsDirectory: 'reports',
            thresholds: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        },
        globals: true,
        include: ['src/**/*.spec.ts'],
        name: 'dma-resource-client',
        open: false,
        outputFile: 'reports/index.html',
        passWithNoTests: true,
        reporters: ['dot', 'html'],
        root: __dirname,
        setupFiles: ['test/setup-test.ts'],
        sequence: {
            shuffle: true,
        },
        ui: !isCI,
    },
});
