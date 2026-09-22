import { RANDOM_DATE_WINDOW_END, RANDOM_DATE_WINDOW_START, randomAEvent, randomDate } from './functions';

describe('randomDate', () => {
    it('should return a date within the random date window', () => {
        for (let i = 0; i < 1_000; i++) {
            const date = randomDate();

            expect(date.getTime()).toBeGreaterThanOrEqual(RANDOM_DATE_WINDOW_START.getTime());
            expect(date.getTime()).toBeLessThan(RANDOM_DATE_WINDOW_END.getTime());
        }
    });

    it('should never return a date before the given lower bound', () => {
        for (let i = 0; i < 1_000; i++) {
            const notBefore = randomDate();

            expect(randomDate(notBefore).getTime()).toBeGreaterThanOrEqual(notBefore.getTime());
        }
    });

    it('should not overflow the stack when the lower bound is at the very end of the window', () => {
        const latest = new Date(RANDOM_DATE_WINDOW_END.getTime() - 1);
        vi.spyOn(Math, 'random').mockReturnValue(0);

        expect(() => randomDate(latest)).not.toThrow();
        expect(randomDate(latest).getTime()).toBeGreaterThanOrEqual(latest.getTime());
    });

    it('should return the lower bound itself when it lies beyond the window', () => {
        const beyond = new Date(RANDOM_DATE_WINDOW_END.getTime() + MS_PER_DAY);

        expect(randomDate(beyond)).toEqual(beyond);
    });
});

describe('randomAEvent', () => {
    it('should never generate an event that ends before it starts', () => {
        for (let i = 0; i < 1_000; i++) {
            const event = randomAEvent();

            expect(event.end.getTime()).toBeGreaterThanOrEqual(event.start.getTime());
        }
    });
});

const MS_PER_DAY = 24 * 60 * 60 * 1_000;
