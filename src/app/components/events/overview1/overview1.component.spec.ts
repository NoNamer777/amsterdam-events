import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EventsOverview1ComponentHarness } from '../../../../testing/harnesses/components/events-overview1-component.harness';
import { Overview1Component } from './overview1.component';

describe('Overview1Component', () => {
    @Component({
        template: `<app-overview1></app-overview1>`,
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [Overview1Component, TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(EventsOverview1ComponentHarness),
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
