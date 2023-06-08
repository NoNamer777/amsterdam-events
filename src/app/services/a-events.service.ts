import { Injectable } from '@angular/core';
import { AEvent, AEventStatus } from '../models/a-event.model';

const MAX_EVENT_PARTICIPANTS = 8000;
const MAX_EVENT_PARTICIPATION_FEE = 50;
const RANDOM_GENERATED_EVENTS = 10;

@Injectable({
    providedIn: 'root',
})
export class AEventsService {
    public events: AEvent[] = [];

    constructor() {
        this.addRandomAEvent();
    }

    /**
     * Returns all events in events
     */
    getAll(): AEvent[] {
        return this.events;
    }

    /**
     * Add a new event.
     * @param newEvent {AEvent}
     * @return {index} The index of the event in the list of events.
     */
    add(newEvent: AEvent): number {
        this.events = [...this.events, newEvent];
        return this.events.indexOf(newEvent);
    }

    /**
     * replace the identified event with the provided
     * @param index of the event which needs to be updated
     * @param aEvent data to update the existing event with
     */
    update(index: number, aEvent: AEvent): void {
        // TODO
        this.events[index] = aEvent;
    }

    /**
     * remove the identified event from the collection
     * and return the removed instance
     * @param index of the event to remove
     */
    remove(index: number): AEvent {
        const removedEvent = this.events.at(index);
        this.events = this.events.splice(index, 1);
        return removedEvent;
    }

    /** Generate {@link RANDOM_GENERATED_EVENTS} number of "random" events */
    private addRandomAEvent(): void {
        for (let i = 0; i < RANDOM_GENERATED_EVENTS; i++) {
            this.events.push(this.generateEvent());
        }
    }

    /**
     * Generates a single event with data.
     * @return AEvent which is generated.
     */
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

    /** Generates a 'random' event status which can be any value of {@link AEventStatus} */
    private randomEventStatus(): AEventStatus {
        const rndNum: number = Math.floor(Math.random() * 3);

        const statuses = Object.keys(AEventStatus) as AEventStatus[];

        return AEventStatus[statuses[rndNum]];
    }

    /**
     * Generates a 'random' date which is after the before parameter
     * @param before date to generate before.
     */
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
