import { Injectable } from '@angular/core';
import { AEvent } from '../models/a-event.model';

interface AEventsDB {
    [eventId: number]: AEvent;
}

@Injectable({
    providedIn: 'root',
})
export class AEventsService {
    public aEvents: AEventsDB;

    public getAll(): AEvent[] {
        return Object.values(this.aEvents);
    }

    public getById(eventId: number): AEvent {
        if (!this.aEvents[eventId]) throw new Error(`Event with ID: '${eventId}' is not found.`);
        return this.aEvents[eventId];
    }

    public add(aEvent: AEvent): number {
        if (this.aEvents[aEvent.id]) throw new Error(`Event with ID: '${aEvent.id}' already exists.`);

        this.aEvents[aEvent.id] = aEvent;
        return aEvent.id;
    }

    public update(eventId: number, aEvent: AEvent): void {
        if (!this.aEvents[eventId]) throw new Error(`Event with ID: '${eventId}' is not found.`);
        if (this.aEvents[eventId].id !== aEvent.id) {
            throw new Error(
                `Could not update Event with ID: '${eventId}' with data from Event with ID: '${aEvent.id}'.`,
            );
        }
        this.aEvents[eventId] = aEvent;
    }

    public remove(eventId: number): AEvent {
        if (!this.aEvents[eventId]) {
            throw new Error(`Could not remove event with ID: '${eventId}' because it does not exist.`);
        }
        const removedEvent = this.aEvents[eventId];

        delete this.aEvents[eventId];
        return removedEvent;
    }
}
