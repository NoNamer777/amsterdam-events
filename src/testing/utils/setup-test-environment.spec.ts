import { setupTestEnvironment } from '@/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { Component, InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('setupTestEnvironment', () => {
    const GREETING = new InjectionToken<string>('greeting');

    @Component({
        selector: 'app-greeting',
        template: `<p class="greeting">Hello</p>`,
    })
    class GreetingComponent {}

    @Component({
        template: `<app-greeting />`,
        imports: [GreetingComponent],
    })
    class TestComponent {}

    class GreetingHarness extends ComponentHarness {
        public static readonly hostSelector = 'app-greeting';

        private readonly greetingLocator = this.locatorFor('.greeting');

        public async getGreeting(): Promise<string> {
            return await (await this.greetingLocator()).text();
        }
    }

    it('should only configure the TestBed when no test component is given', async () => {
        const result = await setupTestEnvironment({ providers: [{ provide: GREETING, useValue: 'Hi' }] });

        expectTypeOf(result).toBeVoid();
        expect(TestBed.inject(GREETING)).toEqual('Hi');
    });

    it('should create a fixture and harness loader for the test component', async () => {
        const { fixture, harnessLoader } = await setupTestEnvironment({ testComponent: TestComponent });

        expectTypeOf(fixture).toEqualTypeOf<ComponentFixture<TestComponent>>();
        expect(fixture.componentInstance).toBeInstanceOf(TestComponent);
        expect(await harnessLoader.getHarness(GreetingHarness)).toBeInstanceOf(GreetingHarness);
    });

    it('should load the harness when a test component and harness are given', async () => {
        const { fixture, harness } = await setupTestEnvironment({
            testComponent: TestComponent,
            harness: GreetingHarness,
        });

        expectTypeOf(fixture).toEqualTypeOf<ComponentFixture<TestComponent>>();
        expectTypeOf(harness).toEqualTypeOf<GreetingHarness>();
        expect(await harness.getGreeting()).toEqual('Hello');
    });
});
