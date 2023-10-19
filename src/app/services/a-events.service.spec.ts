import { TestBed } from '@angular/core/testing';

import { AEvent, AEventStatus } from '../models/a-event.model';
import { AEventsService } from './a-events.service';

fdescribe('AEventsService', () => {
    let service: AEventsService;

    const MAX_EVENT_PARTICIPANTS = 8000;
    const MAX_EVENT_PARTICIPATION_FEE = 50;
    const RANDOM_GENERATED_EVENTS = 10;

    randomEvents();

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AEventsService);
    });

    it('should return all Aevents', () => {
        expect(service.getAll()).toHaveSize(10);
    });

    it('should return an Aevent by ID', () => {});

    it('should throw an Error when AEvent is not found by ID', () => {});

    it('should add a new AEvent', () => {});

    it('should update an AEvent', () => {});

    it('should throw an error when updating an AEvent that does not exist', () => {});

    it('should throw an error when updating an AEvent with data from another AEvent', () => {});

    it('should remove an AEvent', () => {});

    it('should throw an error when removing an AEvent that does not exist.', () => {});

    function randomEvents(): void {
        for (let i = 0; i < RANDOM_GENERATED_EVENTS; i++) {
            const event = generateEvent();
            console.log(event);
            service.add(event);
        }
    }

    function generateEvent(): AEvent {
        const newEvent = new AEvent();
        newEvent.title = `The Fantastic event-${newEvent.id}`;
        newEvent.status = randomEventStatus();
        newEvent.start = randomDate();
        newEvent.end = randomDate(newEvent.start);
        newEvent.hasTickets = Math.random() >= 0.5;
        newEvent.participationFee = newEvent.hasTickets ? Math.floor(Math.random() * MAX_EVENT_PARTICIPATION_FEE) : 0;
        newEvent.maxParticipants = newEvent.hasTickets ? Math.floor(Math.random() * MAX_EVENT_PARTICIPANTS) : 0;

        return newEvent;
    }

    function randomEventStatus(): AEventStatus {
        const rndNum: number = Math.floor(Math.random() * 3);

        const statuses = Object.keys(AEventStatus) as AEventStatus[];

        return AEventStatus[statuses[rndNum]];
    }

    function randomDate(before?: Date): Date {
        const rndDay: number = Math.floor(Math.random() * 31);
        const rndMonth: number = Math.floor(Math.random() * 13);
        const rndYear: number = Math.floor(Math.max(2020, Math.floor(Math.random() * 20) + 2020));
        const rndHour: number = Math.floor(Math.random() * 24);

        const generatedDate = new Date(rndYear, rndMonth, rndDay, rndHour);

        if (before && generatedDate < before) {
            return randomDate(before);
        }
        return generatedDate;
    }
});
