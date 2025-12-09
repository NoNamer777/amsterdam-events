import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AEvent } from '../a-event.model';
import { randomAEvent } from '../functions';
import { RANDOM_GENERATED_EVENTS } from '../constants';

@Component({
    selector: 'app-overview1',
    templateUrl: './overview1.html',
    styleUrl: './overview1.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview1 implements OnInit {
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
