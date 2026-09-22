import { RootComponent } from '@/core';
import { RootHarness } from '@/core/testing';
import { setupTestEnvironment } from '@/testing';
import { Component } from '@angular/core';

describe('RootComponent', () => {
    @Component({
        template: `<app-root />`,
        imports: [RootComponent],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: RootHarness,
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
