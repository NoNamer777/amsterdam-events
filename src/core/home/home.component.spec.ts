import { HomeHarness } from '@/core/testing';
import { setupTestEnvironment } from '@/testing';
import { Component } from '@angular/core';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    @Component({
        template: `<app-home />`,
        imports: [HomeComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: HomeHarness,
        });

        return {
            harness: harness,
        };
    }

    it('should render', async () => {
        const { harness } = await setupTest();
        expect(harness).toBeDefined();
    });
});
