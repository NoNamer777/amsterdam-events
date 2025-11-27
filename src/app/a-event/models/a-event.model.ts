export const AEventStatuses = {
    DRAFT: 'Draft',
    PUBLISHED: 'Published',
    CANCELED: 'Canceled',
} as const;

export type AEventStatus = (typeof AEventStatuses)[keyof typeof AEventStatuses];

export const RANDOM_GENERATED_EVENTS = 10 as const;
const MAX_EVENT_PARTICIPANTS = 8000 as const;
const MAX_EVENT_PARTICIPATION_FEE = 50 as const;

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

export function randomAEvent(): AEvent {
    const newEvent = new AEvent();

    newEvent.title = `The Fantastic event-${newEvent.id}`;
    newEvent.status = randomAEventStatus();
    newEvent.start = randomDate();
    newEvent.end = randomDate(newEvent.start);
    newEvent.hasTickets = Math.random() >= 0.5;
    newEvent.participationFee = newEvent.hasTickets ? Math.floor(Math.random() * MAX_EVENT_PARTICIPATION_FEE) : 0;
    newEvent.maxParticipants = newEvent.hasTickets ? Math.floor(Math.random() * MAX_EVENT_PARTICIPANTS) : 0;

    return newEvent;
}

function randomAEventStatus() {
    const statuses = Object.values(AEventStatuses);
    const rndNum = Math.floor(Math.random() * statuses.length);

    return statuses[rndNum];
}

function randomDate(before?: Date) {
    const rndDay = Math.floor(Math.random() * 31);
    const rndMonth = Math.floor(Math.random() * 13);
    const rndYear = Math.floor(Math.max(2020, Math.floor(Math.random() * 20) + 2020));
    const rndHour = Math.floor(Math.random() * 24);

    const generatedDate = new Date(rndYear, rndMonth, rndDay, rndHour);

    if (before && generatedDate < before) return randomDate(before);
    return generatedDate;
}
