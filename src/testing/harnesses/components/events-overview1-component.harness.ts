import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class EventsOverview1ComponentHarness extends ComponentHarness {
    static hostSelector = 'app-overview1';

    private eventElementsLocator = this.locatorForAll('tr.event');
    private addEventButtonLocator = this.locatorFor('button.addEvent');

    async getEventElements(): Promise<TestElement[]> {
        return this.eventElementsLocator();
    }

    async fireAddEventButton(): Promise<void> {
        const addEventButton = await this.addEventButtonLocator();

        await addEventButton.click();
    }
}
