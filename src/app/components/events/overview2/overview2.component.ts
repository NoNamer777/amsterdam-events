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

    /**
     * Selects an event.
     * @param event The event that is selected.
     */
    onSelectEvent(event: AEvent): void {
        console.log(event);
        if (event.id === this.selectedEvent?.id) {
            return;
        }

        this.selectedEvent = event;
    }

    /**
     * Checks whether any event has been selected, or whether the event
     * that has been passed through to the function has been selected.
     */
    isEventSelected(event: AEvent): boolean {
        // When event is `null` check whether any event has been selected.

        // Otherwise, check if event is the same as the selected event.
        return event.id === this.selectedEvent?.id;
    }
    events: AEvent[] = [];

    constructor() {
        this.randomEvents();
    }

    randomEvents(): void {
        let event: AEvent;

        for (let i = 0; i < RANDOM_GENERATED_EVENTS; i++) {
            event = new AEvent(i + 1);

            event.title = `The Fantastic event-${i}`;
            event.status = this.randomEventStatus();
            event.start = this.randomDate();
            event.end = this.randomDate(event.start);
            event.hasTickets = Math.random() >= 0.5;
            event.participationFee = event.hasTickets ? Math.floor(Math.random() * MAX_EVENT_PARTICIPATION_FEE) : 0;
            event.maxParticipants = event.hasTickets ? Math.floor(Math.random() * MAX_EVENT_PARTICIPANTS) : 0;

            this.events.push(event);
        }

        console.log(this.events);
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
