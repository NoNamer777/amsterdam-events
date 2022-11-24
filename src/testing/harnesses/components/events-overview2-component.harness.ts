import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class EventsOverview2ComponentHarness extends ComponentHarness {
    static hostSelector = 'app-overview2';

    private eventElementsLocator = this.locatorForAll('tr.event-title');
    private selectedEventElementLocator = this.locatorForOptional('tr.event-title.table-primary');
    private eventDetailsPlaceholderLocator = this.locatorForOptional('.event-details-placeholder');
    private eventDetailsLocator = this.locatorForOptional('.event-details');

    async selectEventByIndex(index: number): Promise<void> {
        const eventElements = await this.eventElementsLocator();

        await eventElements[index].click();
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
}
