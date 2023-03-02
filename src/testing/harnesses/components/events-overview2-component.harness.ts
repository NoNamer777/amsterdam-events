import { ComponentHarness, TestElement } from '@angular/cdk/testing';
import { EventsDetails2ComponentHarness } from './events-details2-component.harness';

export class EventsOverview2ComponentHarness extends ComponentHarness {
    static hostSelector = 'app-overview2';

    private eventElementsLocator = this.locatorForAll('tr.event-title');
    private selectedEventElementLocator = this.locatorForOptional(`tr.event-title.table-primary td`);
    private eventDetailsPlaceholderLocator = this.locatorForOptional('.event-details-placeholder');
    private eventDetailsLocator = this.locatorForOptional(EventsDetails2ComponentHarness);
    private addEventButtonLocator = this.locatorFor('button.add-event');

    async selectEventByIndex(index: number): Promise<void> {
        const eventElements = await this.eventElementsLocator();

        await eventElements[index].click();
    }

    async changeEventTitle(title: string): Promise<void> {
        await (await this.eventDetailsLocator()).changeEventTitle(title);
    }

    async getTitleSelectedEvent(): Promise<string> {
        return await (await this.selectedEventElementLocator()).text();
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

    async isEventSelected(index: number): Promise<boolean> {
        return await (await this.getEventElements())[index].hasClass('table-primary');
    }

    async fireAddEventButton(): Promise<void> {
        const addEventButton = await this.addEventButtonLocator();

        await addEventButton.click();
    }

    async fireSaveEvent(): Promise<void> {
        await (await this.eventDetailsLocator()).saveEvent();
    }
}
