import { AEventsService } from './a-events.service';
import { AEvent } from '../models/a-event.model';

describe('AEventsService', () => {
    let service: AEventsService;

    beforeEach(() => {
        service = new AEventsService();
    });

    it('should return all Aevents', () => {
        expect(service.getAll()).toHaveSize(10);
    });

    it('should return an Aevent by ID', () => {
        const event = service.getById(1);
        expect(event).toBeDefined();
        expect(event.id).toEqual(1);
    });

    it('should throw an Error when AEvent is not found by ID', () => {
        expect(() => service.getById(11)).toThrowError(`Event with id '11' does not exist`);
    });

    it('should add a new AEvent', () => {
        expect(service.getAll()).toHaveSize(10);

        const newEvent = new AEvent();
        service.add(newEvent);

        expect(service.getAll()).toHaveSize(11);
        expect(() => service.getById(11)).not.toThrowError();
    });

    it('should update an AEvent', () => {
        const event = service.getById(1);
        const modifiedTitle = 'Modified title';
        event.title = modifiedTitle;

        service.update(1, event);

        expect(service.getById(1).title).toEqual(modifiedTitle);
    });

    it('should throw an error when updating an AEvent that does not exist', () => {
        const event = new AEvent();

        expect(() => service.update(11, event)).toThrowError(
            `Can't update AEvent with ID: '11' because it has not been created yet`,
        );
    });

    it('should throw an error when updating an AEvent with data from another AEvent', () => {
        const event = service.getById(1);
        event.title = 'My new Event title';

        expect(() => service.update(2, event)).toThrowError(
            `Can't update AEvent with ID: '2' with data from AEvent with ID: '1'`,
        );
    });

    it('should remove an AEvent', () => {
        const event = service.getById(1);
        expect(service.getAll()).toHaveSize(10);
        expect(service.remove(1)).toEqual(event);
        expect(service.getAll()).toHaveSize(9);
    });

    it('should throw an error when removing an AEvent that does not exist.', () => {
        expect(() => service.remove(11)).toThrowError(`Event with id '11' does not exist`);
    });
});
