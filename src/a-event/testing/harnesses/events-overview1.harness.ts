import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class EventsOverview1Harness extends ComponentHarness {
    public static readonly hostSelector = 'app-overview1';

    private readonly eventElementsLocator = this.locatorForAll('tr.event');
    private readonly addEventButtonLocator = this.locatorFor('button.add-event');

    public async getEventElements(): Promise<TestElement[]> {
        return this.eventElementsLocator();
    }

    public async fireAddEventButton(): Promise<void> {
        const addEventButton = await this.addEventButtonLocator();

        await addEventButton.click();
    }
}
