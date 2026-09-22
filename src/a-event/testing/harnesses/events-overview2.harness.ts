import { ComponentHarness, TestElement } from '@angular/cdk/testing';
import { EventsDetails2Harness } from './events-details2.harness';

export class EventsOverview2Harness extends ComponentHarness {
    public static readonly hostSelector = 'app-overview2';

    private readonly eventElementsLocator = this.locatorForAll('tr.event-title');
    private readonly eventTitleLocator = this.locatorForAll('tr.event-title td');
    private readonly selectedEventElementLocator = this.locatorForOptional(`tr.event-title.table-primary td`);
    private readonly eventDetailsPlaceholderLocator = this.locatorForOptional('.event-details-placeholder');
    private readonly eventDetailsLocator = this.locatorForOptional(EventsDetails2Harness);
    private readonly addEventButtonLocator = this.locatorFor('button.add-event');

    public async selectEventByIndex(index: number): Promise<void> {
        const events = await this.eventElementsLocator();

        if (events.length === 0) return;
        const event = events[index];

        if (!event) return;
        await event.click();
    }

    public async changeEventTitle(title: string): Promise<void> {
        const eventDetails = await this.eventDetailsLocator();

        if (!eventDetails) return;
        await eventDetails.changeEventTitle(title);
    }

    public async getTitleSelectedEvent(): Promise<string | null> {
        const selectedEvent = await this.selectedEventElementLocator();

        if (!selectedEvent) return null;
        return await selectedEvent.text();
    }

    public async isEventDetailsPlaceholderVisible(): Promise<boolean> {
        return (await this.eventDetailsPlaceholderLocator()) !== null;
    }

    public async isEventDetailsVisible(): Promise<boolean> {
        return (await this.eventDetailsLocator()) !== null;
    }

    public async hasEventSelected(): Promise<boolean> {
        return (await this.selectedEventElementLocator()) !== null;
    }

    public async getEventElements(): Promise<TestElement[]> {
        return this.eventElementsLocator();
    }

    public async getEventTitle(index: number): Promise<string | null> {
        const eventTitles = await this.eventTitleLocator();

        if (eventTitles.length === 0) return null;
        const eventTitle = eventTitles[index];

        if (!eventTitle) return null;
        return await eventTitle.text();
    }

    public async isEventSelected(index: number): Promise<boolean> {
        const events = await this.getEventElements();

        if (events.length === 0) return false;
        const event = events[index];

        if (!event) return false;
        return await event.hasClass('table-primary');
    }

    public async fireAddEventButton(): Promise<void> {
        const addEventButton = await this.addEventButtonLocator();

        await addEventButton.click();
    }
}
