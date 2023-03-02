import { EventsDetails2ComponentHarness } from '@amsterdam-events/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AEvent } from '../../../models/a-event.model';
import { Details2Component } from './details2.component';

describe('Details2Component', () => {
    @Component({
        template: `<app-details2
            [selectedEvent]="event"
            (changedEvent)="onEventChanged()"
            (deleteEvent)="onEventDeleted()"
        ></app-details2>`,
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
            imports: [CommonModule, FormsModule],
            declarations: [Details2Component, TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        return {
            harness: await harnessLoader.getHarness(EventsDetails2ComponentHarness),
            component: fixture.componentInstance,
        };
    }

    it('should have event when loaded', async () => {
        const { harness } = await setupTestEnvironment();

        expect(await harness.getEventElement()).toBeTrue();
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
