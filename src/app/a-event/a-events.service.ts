import { Injectable, signal } from '@angular/core';
import { AEvent, randomAEvent, RANDOM_GENERATED_EVENTS } from './models';

@Injectable({ providedIn: 'root' })
export class AEventsService {
    private events = signal<AEvent[]>([]);

    public constructor() {
        AEvent.nextId = 1;
        this.initializeRandomEvents();
    }

    /**
     * Returns all events in events
     */
    public getAll(): AEvent[] {
        return this.events();
    }

    public getById(id: number): AEvent {
        const foundEvent = this.events().find((event) => event.id === id);

        if (foundEvent === undefined) {
            throw new Error(`Event with id '${id}' does not exist`);
        }
        return foundEvent;
    }

    /**
     * Add a new event.
     * @param newEvent {AEvent}
     * @return {index} The index of the event in the list of events.
     */
    public add(newEvent: AEvent): number {
        this.events.update((events) => [...events, newEvent]);
        return this.events().indexOf(newEvent);
    }

    /**
     * replace the identified event with the provided
     * @param id The ID of the AEvent which needs to be updated.
     * @param updatedEvent The updated AEvent data.
     */
    public update(id: number, updatedEvent: AEvent): void {
        const listedEvent = this.events().find((listEvents) => listEvents.id === id);

        if (listedEvent === undefined) {
            throw new Error(`Can't update AEvent with ID: '${id}' because it has not been created yet`);
        }
        if (listedEvent.id !== updatedEvent.id) {
            throw new Error(
                `Can't update AEvent with ID: '${listedEvent.id}' with data from AEvent with ID: '${updatedEvent.id}'`,
            );
        }
        this.events.update((events) =>
            events.map((listedEvents) => (listedEvents.id === id ? updatedEvent : listedEvents)),
        );
    }

    /**
     * Remove the identified event from the collection
     * and return the removed instance
     * @param id The ID of the AEvent to remove.
     */
    public remove(id: number): AEvent {
        const index = this.events().indexOf(this.getById(id));
        const removed = this.events()[index];

        this.events.update((events) => events.filter(event => event.id !== removed.id));
        return removed;
    }

    /** Generate {@link RANDOM_GENERATED_EVENTS} number of "random" events */
    private initializeRandomEvents() {
        for (let i = 0; i < RANDOM_GENERATED_EVENTS; i++) {
            this.events.update((events) => [...events, randomAEvent()]);
        }
    }
}
