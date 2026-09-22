import { ComponentHarness } from '@angular/cdk/testing';

export class EventsDetails2Harness extends ComponentHarness {
    public static readonly hostSelector = 'app-details2';

    private readonly eventElementsLocator = this.locatorFor('input.event-title');
    private readonly saveEventButtonLocator = this.locatorFor('button.save-event');
    private readonly deleteEventButtonLocator = this.locatorFor('button.delete-event');

    public async changeEventTitle(title: string): Promise<void> {
        await (await this.eventElementsLocator()).clear();
        await (await this.eventElementsLocator()).sendKeys(title);
    }

    public async getEventTitle(): Promise<string> {
        return await (await this.eventElementsLocator()).getProperty('value');
    }

    public async getEventElement(): Promise<boolean> {
        return (await this.eventElementsLocator()) !== null;
    }

    public async saveEvent(): Promise<void> {
        await (await this.saveEventButtonLocator()).click();
    }

    public async fireDeleteEventButton(): Promise<void> {
        await (await this.deleteEventButtonLocator()).click();
    }
}
