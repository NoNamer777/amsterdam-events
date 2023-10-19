import { ComponentHarness } from '@angular/cdk/testing';

export class EventsDetails2ComponentHarness extends ComponentHarness {
    static hostSelector = 'app-details2';

    private eventElementsLocator = this.locatorFor('input.event-title');
    private saveEventButtonLocator = this.locatorFor('button.save-event');
    private deleteEventButtonLocator = this.locatorFor('button.delete-event');

    async changeEventTitle(title: string): Promise<void> {
        await (await this.eventElementsLocator()).clear();
        await (await this.eventElementsLocator()).sendKeys(title);
    }

    async getEventTitle(): Promise<string> {
        return await (await this.eventElementsLocator()).getProperty('value');
    }

    async getEventElement(): Promise<boolean> {
        return (await this.eventElementsLocator()) !== null;
    }

    async saveEvent(): Promise<void> {
        await (await this.saveEventButtonLocator()).click();
    }

    async fireDeleteEventButton(): Promise<void> {
        await (await this.deleteEventButtonLocator()).click();
    }
}
