import { EventsOverview1Harness } from '@amsterdam-events/test';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Overview1 } from './overview1';

describe('Overview1Component', () => {
    @Component({
        template: `<app-overview1 />`,
        imports: [Overview1],
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(EventsOverview1Harness),
        };
    }

    it('should show the events', async () => {
        const { harness } = await setupTestEnvironment();

        expect((await harness.getEventElements()).length).toEqual(10);
    });

    it('should add new event', async () => {
        const { harness } = await setupTestEnvironment();

        expect((await harness.getEventElements()).length).toEqual(10);

        await harness.fireAddEventButton();
        expect((await harness.getEventElements()).length).toEqual(11);
    });
});
