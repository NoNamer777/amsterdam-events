import { HomeHarness } from '@/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    @Component({
        template: `<app-home />`,
        imports: [HomeComponent],
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
