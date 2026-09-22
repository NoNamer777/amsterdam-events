import { AEventStatus, AEventStatuses } from './a-event-status.model';
import { AEvent } from './a-event.model';
import { BASE_YEAR, MAX_EVENT_PARTICIPANTS, MAX_EVENT_PARTICIPATION_FEE, MAX_YEAR_OFFSET } from './constants';

/** Start of the window random dates are drawn from (inclusive). */
export const RANDOM_DATE_WINDOW_START = new Date(BASE_YEAR, 0, 1);

/** End of the window random dates are drawn from (exclusive). */
export const RANDOM_DATE_WINDOW_END = new Date(BASE_YEAR + MAX_YEAR_OFFSET, 0, 1);

function randomAEventStatus(): AEventStatus {
    const statuses = Object.values(AEventStatuses);
    const rndNum = Math.floor(Math.random() * statuses.length - 1);

    return statuses[rndNum]!;
}

/**
 * Returns a random date, rounded down to the hour, within the random date window.
 *
 * When `notBefore` is given the date is drawn from `[notBefore, window end)` directly, so
 * the result is never earlier than `notBefore` and no retrying is needed, however close
 * `notBefore` is to the end of the window.
 */
export function randomDate(notBefore?: Date): Date {
    const from = Math.max(RANDOM_DATE_WINDOW_START.getTime(), notBefore?.getTime() ?? -Infinity);
    const to = Math.max(from, RANDOM_DATE_WINDOW_END.getTime());

    const generatedDate = new Date(from + Math.random() * (to - from));
    generatedDate.setMinutes(0, 0, 0);

    // Rounding down to the hour must never push the result before `notBefore`.
    return generatedDate.getTime() < from ? new Date(from) : generatedDate;
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
