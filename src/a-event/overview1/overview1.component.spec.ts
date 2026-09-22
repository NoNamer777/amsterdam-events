import { Overview1Component } from '@/a-event';
import { EventsOverview1Harness } from '@/a-event/testing';
import { setupTestEnvironment } from '@/testing';
import { Component } from '@angular/core';

describe('Overview1Component', () => {
    @Component({
        template: `<app-overview1 />`,
        imports: [Overview1Component],
    })
    class TestComponent {}

    async function setupTest() {
        const { harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: EventsOverview1Harness,
        });

        return {
            harness: harness,
        };
    }

    it('should show the events', async () => {
        const { harness } = await setupTest();
        expect((await harness.getEventElements()).length).toEqual(10);
    });

    it('should add new event', async () => {
        const { harness } = await setupTest();
        expect((await harness.getEventElements()).length).toEqual(10);

        await harness.fireAddEventButton();
        expect((await harness.getEventElements()).length).toEqual(11);
    });
});
