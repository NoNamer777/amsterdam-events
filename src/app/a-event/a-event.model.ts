import { AEventStatus } from './a-event-status.model';

export class AEvent {
    public static nextId = 1;

    public readonly id: number;

    public title: string;

    public start: Date;

    public end: Date;

    public description: string;

    public status: AEventStatus;

    public hasTickets: boolean;

    public participationFee: number;

    public maxParticipants: number;

    public constructor(id?: number) {
        this.id = id ? id : AEvent.nextId++;
    }

    public clone() {
        const clone = new AEvent(this.id);
        clone.title = this.title;
        clone.start = this.start;
        clone.end = this.end;
        clone.description = this.description;
        clone.status = this.status;
        clone.hasTickets = this.hasTickets;
        clone.participationFee = this.participationFee;
        clone.maxParticipants = this.maxParticipants;

        return clone;
    }
}
