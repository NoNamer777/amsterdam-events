import { ComponentHarness, TestElement } from '@angular/cdk/testing';
import { EventsDetails2Harness } from './events-details2.harness';

export class EventsOverview2Harness extends ComponentHarness {
    static hostSelector = 'app-overview2';

    private eventElementsLocator = this.locatorForAll('tr.event-title');
    private eventTitleLocator = this.locatorForAll('tr.event-title td');
    private selectedEventElementLocator = this.locatorForOptional(`tr.event-title.table-primary td`);
    private eventDetailsPlaceholderLocator = this.locatorForOptional('.event-details-placeholder');
    private eventDetailsLocator = this.locatorForOptional(EventsDetails2Harness);
    private addEventButtonLocator = this.locatorFor('button.add-event');

    async selectEventByIndex(index: number): Promise<void> {
        const eventElements = await this.eventElementsLocator();

        if (eventElements.length === 0) return;
        const eventElement = eventElements[index];

        if (!eventElement) return;
        await eventElement.click();
    }

    async changeEventTitle(title: string): Promise<void> {
        const eventDetails = await this.eventDetailsLocator();

        if (!eventDetails) return;
        await eventDetails.changeEventTitle(title);
    }

    async getTitleSelectedEvent(): Promise<string | null> {
        const selectedEvent = await this.selectedEventElementLocator();

        if (!selectedEvent) return null;
        return await selectedEvent.text();
    }

    async isEventDetailsPlaceholderVisible(): Promise<boolean> {
        return (await this.eventDetailsPlaceholderLocator()) !== null;
    }

    async isEventDetailsVisible(): Promise<boolean> {
        return (await this.eventDetailsLocator()) !== null;
    }

    async hasEventSelected(): Promise<boolean> {
        return (await this.selectedEventElementLocator()) !== null;
    }

    async getEventElements(): Promise<TestElement[]> {
        return this.eventElementsLocator();
    }

    async getEventTitle(index: number): Promise<string | null> {
        const eventTitles = await this.eventTitleLocator();

        if (!eventTitles) return null;
        const eventTitle = eventTitles[index];

        if (!eventTitle) return null;
        return await eventTitle.text();
    }

    async isEventSelected(index: number): Promise<boolean> {
        const events = await this.getEventElements();

        if (events.length === 0) return false;
        const eventElement = events[index];

        if (!eventElement) return false;
        return await eventElement.hasClass('table-primary');
    }

    async fireAddEventButton(): Promise<void> {
        const addEventButton = await this.addEventButtonLocator();

        await addEventButton.click();
    }

    async fireSaveEvent(): Promise<void> {
        const eventDetails = await this.eventDetailsLocator();

        if (!eventDetails) return;
        await eventDetails.saveEvent();
    }
}
