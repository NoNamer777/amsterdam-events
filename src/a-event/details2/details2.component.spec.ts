import { EventsDetails2Harness } from '@/a-event/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AEvent } from '../a-event.model';
import { Details2Component } from './details2.component';

describe('Details2Component', () => {
    @Component({
        template: `<app-details2
            [selectedEvent]="event"
            (eventSaved)="onEventChanged()"
            (eventRemoved)="onEventDeleted()"
        />`,
        imports: [Details2Component],
    })
    class TestComponent {
        public event = new AEvent();
        public eventChangedEmits = 0;
        public eventDeletedEmits = 0;

        constructor() {
            this.event.title = 'Test event';
        }

        onEventChanged(): void {
            this.eventChangedEmits++;
        }

        onEventDeleted(): void {
            this.eventDeletedEmits++;
        }
    }

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [Details2Component],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(EventsDetails2Harness),
            component: fixture.componentInstance,
        };
    }

    it('should have event when loaded', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.getEventElement()).toEqual(true);
    });

    it('should fire save action', async () => {
        const { harness, component } = await setupTestEnvironment();

        expect(component.eventChangedEmits).toEqual(0);

        await harness.saveEvent();

        expect(component.eventChangedEmits).toEqual(1);
    });

    it('should fire delete action', async () => {
        const { harness, component } = await setupTestEnvironment();

        expect(component.eventDeletedEmits).toEqual(0);

        await harness.fireDeleteEventButton();

        expect(component.eventDeletedEmits).toEqual(1);
    });
});
