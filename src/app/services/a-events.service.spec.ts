import { TestBed } from '@angular/core/testing';

import { AEventsService } from './a-events.service';

fdescribe('AEventsService', () => {
    let service: AEventsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AEventsService);
    });

    it('should return all Aevents', () => {
        expect(service.getAll()).toHaveSize(10);
    });

    it('should return an Aevent by ID', () => {
        expect(service.)
    });

    it('should throw an Error when AEvent is not found by ID', () => {});

    it('should add a new AEvent', () => {});

    it('should update an AEvent', () => {});

    it('should throw an error when updating an AEvent that does not exist', () => {});

    it('should throw an error when updating an AEvent with data from another AEvent', () => {});

    it('should remove an AEvent', () => {});

    it('should throw an error when removing an AEvent that does not exist.', () => {});
});
