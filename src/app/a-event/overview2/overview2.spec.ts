import { EventsDetails2Harness, EventsOverview2Harness } from '@amsterdam-events/test';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Overview2 } from './overview2';

describe('Overview2Component', () => {
    @Component({
        template: `<app-overview2 />`,
        imports: [Overview2],
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(EventsOverview2Harness),
            harnessLoader: harnessLoader,
        };
    }

    it('should show the events', async () => {
        const { harness } = await setupTestEnvironment();

        expect((await harness.getEventElements()).length).toEqual(10);
        expect(await harness.isEventDetailsPlaceholderVisible()).toEqual(true);
        expect(await harness.isEventDetailsVisible()).toEqual(false);
        expect(await harness.hasEventSelected()).toEqual(false);
    });

    it('should set event by click action', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.hasEventSelected()).toEqual(false);

        await harness.selectEventByIndex(1);
        expect(await harness.hasEventSelected()).toEqual(true);
        expect(await harness.isEventSelected(1)).toEqual(true);
        expect(await harness.isEventSelected(2)).toEqual(false);

        await harness.selectEventByIndex(2);
        expect(await harness.hasEventSelected()).toEqual(true);
        expect(await harness.isEventSelected(2)).toEqual(true);
        expect(await harness.isEventSelected(1)).toEqual(false);

        await harness.selectEventByIndex(2);
        expect(await harness.hasEventSelected()).toEqual(true);
        expect(await harness.isEventSelected(2)).toEqual(true);
    });

    it('should show event details when event is selected', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isEventDetailsPlaceholderVisible()).toEqual(true);
        expect(await harness.isEventDetailsVisible()).toEqual(false);

        await harness.selectEventByIndex(1);

        expect(await harness.isEventDetailsPlaceholderVisible()).toEqual(false);
        expect(await harness.isEventDetailsVisible()).toEqual(true);
    });

    it('should add new event', async () => {
        const { harness } = await setupTestEnvironment();

        expect((await harness.getEventElements()).length).toEqual(10);

        await harness.fireAddEventButton();
        expect((await harness.getEventElements()).length).toEqual(11);
    });

    it('should save event changes', async () => {
        const { harness, harnessLoader } = await setupTestEnvironment();
        const newEventTitle = 'my event title';

        await harness.selectEventByIndex(0);

        const detailsComponentHarness = await harnessLoader.getHarness(EventsDetails2Harness);
        expect(await harness.getTitleSelectedEvent()).toEqual('The Fantastic event-1');

        // await detailsComponentHarness.changeEventTitle(newEventTitle);
        await harness.changeEventTitle(newEventTitle);

        // We expect the change only to propagate when we click on the save btn.
        expect(await harness.getTitleSelectedEvent()).toEqual('The Fantastic event-1');

        await detailsComponentHarness.saveEvent();

        expect(await detailsComponentHarness.getEventTitle()).toEqual(newEventTitle);
        expect(await harness.getEventTitle(0)).toEqual(newEventTitle);
    });

    it('should delete event', async () => {
        const { harness, harnessLoader } = await setupTestEnvironment();

        await harness.selectEventByIndex(0);

        const detailsComponentHarness = await harnessLoader.getHarness(EventsDetails2Harness);

        expect(await harness.hasEventSelected()).toEqual(true);
        expect(await harness.getEventElements()).toHaveLength(10);

        await detailsComponentHarness.fireDeleteEventButton();

        expect(await harness.hasEventSelected()).toEqual(false);
        expect(await harness.getEventElements()).toHaveLength(9);
    });
});
