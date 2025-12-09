import { AEvent } from './a-event.model';
import { AEventStatuses } from './a-event-status.model';
import {
    BASE_YEAR,
    MAX_DAYS_PER_MONTH,
    MAX_EVENT_PARTICIPANTS,
    MAX_EVENT_PARTICIPATION_FEE,
    MAX_HOURS_PER_DAY,
    MAX_MONTHS_PER_YEAR,
    MAX_YEAR_OFFSET,
} from './constants';

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
    const rndDay = Math.floor(Math.random() * MAX_DAYS_PER_MONTH);
    const rndMonth = Math.floor(Math.random() * MAX_MONTHS_PER_YEAR);
    const rndYear = Math.floor(Math.max(BASE_YEAR, Math.floor(Math.random() * MAX_YEAR_OFFSET) + BASE_YEAR));
    const rndHour = Math.floor(Math.random() * MAX_HOURS_PER_DAY);

    const generatedDate = new Date(rndYear, rndMonth, rndDay, rndHour);

    if (before && generatedDate < before) return randomDate(before);
    return generatedDate;
}
