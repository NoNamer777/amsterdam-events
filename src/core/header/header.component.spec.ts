import { HeaderHarness } from '@/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    @Component({
        template: `<app-header />`,
        imports: [HeaderComponent],
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
