export type AEventStatusType = { [status: string]: AEventStatus };

export enum AEventStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    CANCELED = 'CANCELED',
}

export class AEvent {
    private readonly _id: number;
    private _title: string;
    private _start: Date;
    private _end: Date;
    private _description: string;
    private _status: AEventStatus;
    private _hasTickets: boolean;
    private _participationFee: number;
    private _maxParticipants: number;

    private static nextId = 1;

    constructor() {
        this._id = AEvent.nextId++;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get start(): Date {
        return this._start;
    }

    set start(value: Date) {
        this._start = value;
    }

    get end(): Date {
        return this._end;
    }

    set end(value: Date) {
        this._end = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get status(): AEventStatus {
        return this._status;
    }

    set status(value: AEventStatus) {
        this._status = value;
    }

    get hasTickets(): boolean {
        return this._hasTickets;
    }

    set hasTickets(value: boolean) {
        this._hasTickets = value;
    }

    get participationFee(): number {
        return this._participationFee;
    }

    set participationFee(value: number) {
        this._participationFee = value;
    }

    get maxParticipants(): number {
        return this._maxParticipants;
    }

    set maxParticipants(value: number) {
        this._maxParticipants = value;
    }
}
