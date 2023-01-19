import { Component } from '@angular/core';
import { AEvent, AEventStatus } from '../../../models/a-event.model';

const MAX_EVENT_PARTICIPANTS = 8000;
const MAX_EVENT_PARTICIPATION_FEE = 50;

@Component({
    selector: 'app-details2',
    templateUrl: './details2.component.html',
    styleUrls: ['./details2.component.scss'],
})
export class Details2Component {
    selectedEvent: AEvent = new AEvent();

    statuses = Object.values(AEventStatus);

    constructor() {
        this.selectedEvent.title = `The Fantastic event-${this.selectedEvent.id}`;
        this.selectedEvent.description = `A very nice event`;
        this.selectedEvent.status = this.randomEventStatus();
        this.selectedEvent.start = this.randomDate();
        this.selectedEvent.end = this.randomDate(this.selectedEvent.start);
        this.selectedEvent.hasTickets = Math.random() >= 0.5;
        this.selectedEvent.participationFee = this.selectedEvent.hasTickets
            ? Math.floor(Math.random() * MAX_EVENT_PARTICIPATION_FEE)
            : 0;
        this.selectedEvent.maxParticipants = this.selectedEvent.hasTickets
            ? Math.floor(Math.random() * MAX_EVENT_PARTICIPANTS)
            : 0;

        console.log(this.selectedEvent);
    }

    onSaveEvent(): void {
        alert('WIP');
    }

    onDeleteEvent(): void {
        alert('WIP');
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
