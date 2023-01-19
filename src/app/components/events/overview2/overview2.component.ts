import { Component } from '@angular/core';
import { AEvent, AEventStatus } from '../../../models/a-event.model';

const MAX_EVENT_PARTICIPANTS = 8000;
const MAX_EVENT_PARTICIPATION_FEE = 50;
const RANDOM_GENERATED_EVENTS = 10;

@Component({
    selector: 'app-overview2',
    templateUrl: './overview2.component.html',
    styleUrls: ['./overview2.component.scss'],
})
export class Overview2Component {
    selectedEvent: AEvent = null;

    onAddEvent(): void {
        this.events.push(this.generateEvent());
    }

    /**
     * Selects an event.
     * @param event The event that is selected.
     */
    onSelectEvent(event: AEvent): void {
        if (event.id === this.selectedEvent?.id) {
            return;
        }

        this.selectedEvent = Object.assign(new AEvent(false), event);
    }

    changeEvent(newEvent: AEvent) {
        this.events = this.events.map((oldEvent) => (oldEvent.id === newEvent.id ? newEvent : oldEvent));
    }

    deleteEvent(eventId: number) {
        this.events = this.events.filter((event) => event.id !== eventId);
        this.selectedEvent = null;
    }

    /**
     * Checks whether any event has been selected, or whether the event
     * that has been passed through to the function has been selected.
     */
    isEventSelected(event?: AEvent): boolean {
        // When event is `null` check whether any event has been selected.
        if (!event) return this.selectedEvent !== null;

        // Otherwise, check if event is the same as the selected event.
        return event.id === this.selectedEvent?.id;
    }
    events: AEvent[] = [];

    constructor() {
        this.randomEvents();
    }

    randomEvents(): void {
        for (let i = 0; i < RANDOM_GENERATED_EVENTS; i++) {
            this.events.push(this.generateEvent());
        }
    }

    private generateEvent(): AEvent {
        const newEvent = new AEvent();
        newEvent.title = `The Fantastic event-${newEvent.id}`;
        newEvent.status = this.randomEventStatus();
        newEvent.start = this.randomDate();
        newEvent.end = this.randomDate(newEvent.start);
        newEvent.hasTickets = Math.random() >= 0.5;
        newEvent.participationFee = newEvent.hasTickets ? Math.floor(Math.random() * MAX_EVENT_PARTICIPATION_FEE) : 0;
        newEvent.maxParticipants = newEvent.hasTickets ? Math.floor(Math.random() * MAX_EVENT_PARTICIPANTS) : 0;

        return newEvent;
    }

    private randomEventStatus(): AEventStatus {
        const rndNum: number = Math.floor(Math.random() * 3);

        const statuses = Object.keys(AEventStatus) as AEventStatus[];

        return AEventStatus[statuses[rndNum]];
    }

    private randomDate(before?: Date): Date {
        const rndDay: number = Math.floor(Math.random() * 31);
        const rndMonth: number = Math.floor(Math.random() * 13);
        const rndYear: number = Math.floor(Math.max(2020, Math.floor(Math.random() * 20) + 2020));
        const rndHour: number = Math.floor(Math.random() * 24);

        const generatedDate = new Date(rndYear, rndMonth, rndDay, rndHour);

        if (before && generatedDate < before) {
            return this.randomDate(before);
        }
        return generatedDate;
    }
}
