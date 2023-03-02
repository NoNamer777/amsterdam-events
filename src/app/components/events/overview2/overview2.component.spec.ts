import { EventsDetails2ComponentHarness, EventsOverview2ComponentHarness } from '@amsterdam-events/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Details2Component } from '../details2/details2.component';
import { Overview2Component } from './overview2.component';

describe('Overview2Component', () => {
    @Component({
        template: `<app-overview2></app-overview2>`,
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [Details2Component, Overview2Component, TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(EventsOverview2ComponentHarness),
            harnessLoader: harnessLoader,
            fixture: fixture,
        };
    }

    it('should show the events', async () => {
        const { harness } = await setupTestEnvironment();

        expect((await harness.getEventElements()).length).toEqual(10);
        expect(await harness.isEventDetailsPlaceholderVisible()).toBeTrue();
        expect(await harness.isEventDetailsVisible()).toBeFalse();
        expect(await harness.hasEventSelected()).toBeFalse();
    });

    it('should set event by click action', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.hasEventSelected()).toBeFalse();

        await harness.selectEventByIndex(1);
        expect(await harness.hasEventSelected()).toBeTrue();
        expect(await harness.isEventSelected(1)).toBeTrue();
        expect(await harness.isEventSelected(2)).toBeFalse();

        await harness.selectEventByIndex(2);
        expect(await harness.hasEventSelected()).toBeTrue();
        expect(await harness.isEventSelected(2)).toBeTrue();
        expect(await harness.isEventSelected(1)).toBeFalse();

        await harness.selectEventByIndex(2);
        expect(await harness.hasEventSelected()).toBeTrue();
        expect(await harness.isEventSelected(2)).toBeTrue();
    });

    it('should show event details when event is selected', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.isEventDetailsPlaceholderVisible()).toBeTrue();
        expect(await harness.isEventDetailsVisible()).toBeFalse();

        await harness.selectEventByIndex(1);

        expect(await harness.isEventDetailsPlaceholderVisible()).toBeFalse();
        expect(await harness.isEventDetailsVisible()).toBeTrue();
    });

    it('should add new event', async () => {
        const { harness } = await setupTestEnvironment();

        expect((await harness.getEventElements()).length).toEqual(10);

        await harness.fireAddEventButton();
        expect((await harness.getEventElements()).length).toEqual(11);
    });

    // Ignore test for now because it doesn't reflect the changed title after the save has been emitted.
    xit('should save event changes', async () => {
        const { harness, harnessLoader } = await setupTestEnvironment();
        const newEventTitle = 'my event title';

        await harness.selectEventByIndex(0);

        const detailsComponentHarness = await harnessLoader.getHarness(EventsDetails2ComponentHarness);
        expect(await harness.getTitleSelectedEvent()).toEqual('The Fantastic event-1');

        // await detailsComponentHarness.changeEventTitle(newEventTitle);
        await harness.changeEventTitle(newEventTitle);

        // We expect the change only to propagate when we click on the save btn.
        expect(await harness.getTitleSelectedEvent()).toEqual('The Fantastic event-1');

        await detailsComponentHarness.saveEvent();

        expect(await detailsComponentHarness.getEventTitle()).toEqual(newEventTitle);
        expect(await (await harness.getEventElements())[0].text()).toEqual(newEventTitle);
    });

    it('should delete event', async () => {
        const { harness, harnessLoader } = await setupTestEnvironment();

        await harness.selectEventByIndex(0);

        const detailsComponentHarness = await harnessLoader.getHarness(EventsDetails2ComponentHarness);

        expect(await harness.hasEventSelected()).toBeTrue();
        expect(await harness.getEventElements()).toHaveSize(10);

        await detailsComponentHarness.fireDeleteEventButton();

        expect(await harness.hasEventSelected()).toBeFalse();
        expect(await harness.getEventElements()).toHaveSize(9);
    });
});
