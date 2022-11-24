import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EventsOverview2ComponentHarness } from '../../../../testing';
import { Overview2Component } from './overview2.component';

fdescribe('Overview2Component', () => {
    @Component({
        template: `<app-overview2></app-overview2>`,
    })
    class TestComponent {}

    async function setupTestEnvironment() {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [Overview2Component, TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(EventsOverview2ComponentHarness),
        };
    }

    it('should show the events', async () => {
        const { harness } = await setupTestEnvironment();

        expect((await harness.getEventElements()).length).toEqual(10);
        expect(await harness.isEventDetailsPlaceholderVisible()).toBeTrue();
        expect(await harness.isEventDetailsVisible()).toBeFalse();
        expect(await harness.hasEventSelected()).toBeFalse();
    });
});
