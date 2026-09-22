import { EventsDetails2Harness } from '@/a-event/testing';
import { setupTestEnvironment } from '@/testing';
import { Component } from '@angular/core';
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

        public onEventChanged(): void {
            this.eventChangedEmits++;
        }

        public onEventDeleted(): void {
            this.eventDeletedEmits++;
        }
    }

    async function setupTest() {
        const { harness, fixture } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: EventsDetails2Harness,
        });

        return {
            harness: harness,
            component: fixture.componentInstance,
        };
    }

    it('should have event when loaded', async () => {
        const { harness } = await setupTest();

        expect(await harness.getEventElement()).toEqual(true);
    });

    it('should fire save action', async () => {
        const { harness, component } = await setupTest();

        expect(component.eventChangedEmits).toEqual(0);

        await harness.saveEvent();

        expect(component.eventChangedEmits).toEqual(1);
    });

    it('should fire delete action', async () => {
        const { harness, component } = await setupTest();

        expect(component.eventDeletedEmits).toEqual(0);

        await harness.fireDeleteEventButton();

        expect(component.eventDeletedEmits).toEqual(1);
    });
});
