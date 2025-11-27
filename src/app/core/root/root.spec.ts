import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RootHarness } from '@amsterdam-events/test';
import { Root } from './root';

describe('Root', () => {
    @Component({
        template: `<app-root />`,
        imports: [Root],
    })
    class TestComponent {}

    async function setupTest() {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        const harnessLoader = TestbedHarnessEnvironment.loader(TestBed.createComponent(TestComponent));

        return {
            harness: await harnessLoader.getHarness(RootHarness),
        };
    }

    it('should be defined', async () => {
        const { harness } = await setupTest();
        expect(harness).not.toBeNull();
    });
});
