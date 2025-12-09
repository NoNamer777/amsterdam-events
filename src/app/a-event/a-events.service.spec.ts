import { AEventsService } from './a-events.service';
import { TestBed } from '@angular/core/testing';
import { AEvent } from './a-event.model';

describe('AEventsService', () => {
    function setupTest() {
        TestBed.configureTestingModule({});

        return {
            service: TestBed.inject(AEventsService),
        };
    }

    it('should return all AEvents', () => {
        const { service } = setupTest();

        expect(service.getAll()).toHaveLength(10);
    });

    it('should return an AEvent by ID', () => {
        const { service } = setupTest();

        const event = service.getById(1);
        expect(event).toBeDefined();
        expect(event.id).toEqual(1);
    });

    it('should throw an Error when AEvent is not found by ID', () => {
        const { service } = setupTest();

        expect(() => service.getById(11)).toThrowError(`Event with id '11' does not exist`);
    });

    it('should add a new AEvent', () => {
        const { service } = setupTest();

        expect(service.getAll()).toHaveLength(10);

        const newEvent = new AEvent();
        service.add(newEvent);

        expect(service.getAll()).toHaveLength(11);
        expect(() => service.getById(11)).not.toThrowError();
    });

    it('should update an AEvent', () => {
        const { service } = setupTest();

        const event = service.getById(1);
        const modifiedTitle = 'Modified title';
        event.title = modifiedTitle;

        service.update(1, event);

        expect(service.getById(1).title).toEqual(modifiedTitle);
    });

    it('should throw an error when updating an AEvent that does not exist', () => {
        const { service } = setupTest();

        const event = new AEvent();

        expect(() => service.update(11, event)).toThrowError(
            `Can't update AEvent with ID: '11' because it has not been created yet`,
        );
    });

    it('should throw an error when updating an AEvent with data from another AEvent', () => {
        const { service } = setupTest();

        const event = service.getById(1);
        event.title = 'My new Event title';

        expect(() => service.update(2, event)).toThrowError(
            `Can't update AEvent with ID: '2' with data from AEvent with ID: '1'`,
        );
    });

    it('should remove an AEvent', () => {
        const { service } = setupTest();

        const event = service.getById(1);

        expect(service.getAll()).toHaveLength(10);
        expect(service.remove(1)).toEqual(event);
        expect(service.getAll()).toHaveLength(9);
    });

    it('should throw an error when removing an AEvent that does not exist.', () => {
        const { service } = setupTest();

        expect(() => service.remove(11)).toThrowError(`Event with id '11' does not exist`);
    });
});
