import { TestBed } from '@angular/core/testing';
import { Home } from './home';
import { Component } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HomeHarness } from '@amsterdam-events/test';

describe('Home', () => {
    @Component({
        template: `<app-home />`,
        imports: [Home],
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(HomeHarness),
        };
    }

    it('should be defined', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
