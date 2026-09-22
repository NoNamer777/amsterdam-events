import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AEvent } from '../a-event.model';
import { RANDOM_GENERATED_EVENTS } from '../constants';
import { randomAEvent } from '../functions';

@Component({
    selector: 'app-overview1',
    templateUrl: './overview1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview1Component implements OnInit {
    protected events: AEvent[] = [];

    public ngOnInit(): void {
        this.randomEvents();
    }

    protected getParticipationFee(event: AEvent): string {
        return event.hasTickets ? `€${event.participationFee}` : '';
    }

    protected getMaxParticipants(event: AEvent): string {
        return event.maxParticipants ? `${event.maxParticipants}` : '';
    }

    protected onAddEvent(): void {
        this.events.push(randomAEvent());
    }

    private randomEvents() {
        for (let i = 0; i < RANDOM_GENERATED_EVENTS; i++) {
            this.events.push(randomAEvent());
        }
    }
}
