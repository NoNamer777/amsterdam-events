import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AEvent, randomAEvent, RANDOM_GENERATED_EVENTS } from '../models';
import { Details2 } from './details2';

@Component({
    selector: 'app-overview2',
    templateUrl: './overview2.html',
    styleUrl: './overview2.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Details2],
})
export class Overview2 implements OnInit {
    protected selectedEvent: AEvent = null;

    protected events: AEvent[] = [];

    public ngOnInit(): void {
        AEvent.nextId = 1;
        this.randomEvents();
    }

    protected onAddEvent(): void {
        const event = randomAEvent();
        this.events.push(event);
        this.onSelectEvent(event);
    }

    /**
     * Selects an event.
     * @param event The event that is selected.
     */
    protected onSelectEvent(event: AEvent): void {
        if (event.id === this.selectedEvent?.id) {
            return;
        }

        this.selectedEvent = event.clone();
    }

    protected onEventUpdated(newEvent: AEvent): void {
        this.events = this.events.map((oldEvent) => (oldEvent.id === newEvent.id ? newEvent : oldEvent));
    }

    protected onEventRemoved(eventId: number): void {
        this.events = this.events.filter((event) => event.id !== eventId);
        this.selectedEvent = null;
    }

    /**
     * Checks whether any event has been selected, or whether the event
     * that has been passed through to the function has been selected.
     */
    protected isEventSelected(event?: AEvent): boolean {
        // When event is `null` check whether any event has been selected.
        if (!event) return this.selectedEvent !== null;

        // Otherwise, check if event is the same as the selected event.
        return event.id === this.selectedEvent?.id;
    }

    private randomEvents() {
        for (let i = 0; i < RANDOM_GENERATED_EVENTS; i++) {
            this.events.push(randomAEvent());
        }
    }
}
