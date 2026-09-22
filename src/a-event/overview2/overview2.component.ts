import { Component, OnInit } from '@angular/core';
import { AEvent } from '../a-event.model';
import { RANDOM_GENERATED_EVENTS } from '../constants';
import { Details2Component } from '../details2/details2.component';
import { randomAEvent } from '../functions';

@Component({
    selector: 'app-overview2',
    templateUrl: './overview2.component.html',
    imports: [Details2Component],
})
export class Overview2Component implements OnInit {
    protected selectedEvent: AEvent | undefined;

    protected events: AEvent[] = [];

    public ngOnInit(): void {
        AEvent.nextId = 1;
        this.randomEvents();
    }

    protected onAddEvent() {
        const event = randomAEvent();
        this.events.push(event);
        this.onSelectEvent(event);
    }

    /**
     * Selects an event.
     * @param event The event that is selected.
     */
    protected onSelectEvent(event: AEvent) {
        if (event.id === this.selectedEvent?.id) {
            return;
        }

        this.selectedEvent = event.clone();
    }

    protected onEventUpdated(newEvent: AEvent) {
        this.events = this.events.map((oldEvent) => (oldEvent.id === newEvent.id ? newEvent : oldEvent));
    }

    protected onEventRemoved(eventId: number) {
        this.events = this.events.filter((event) => event.id !== eventId);
        this.selectedEvent = undefined;
    }

    /**
     * Checks whether any event has been selected, or whether the event
     * that has been passed through to the function has been selected.
     */
    protected isEventSelected(event: AEvent) {
        // Otherwise, check if event is the same as the selected event.
        return event.id === this.selectedEvent?.id;
    }

    private randomEvents() {
        for (let i = 0; i < RANDOM_GENERATED_EVENTS; i++) {
            this.events.push(randomAEvent());
        }
    }
}
