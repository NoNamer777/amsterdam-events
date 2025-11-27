import { TestBed } from '@angular/core/testing';
import { Header } from './header';
import { Component } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HeaderHarness } from '@amsterdam-events/test';

describe('HeaderComponent', () => {
    @Component({
        template: `<app-header />`,
        imports: [Header],
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(HeaderHarness),
        };
    }

    it('should be defined', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
