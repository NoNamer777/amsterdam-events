import { ComponentHarness, HarnessLoader, HarnessQuery } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

interface TestModuleParams {
    imports?: TestModuleMetadata['imports'];
    providers?: TestModuleMetadata['providers'];
}

interface TestComponentParams<T> extends TestModuleParams {
    testComponent: Type<T>;
}

interface TestHarnessParams<T, H extends ComponentHarness> extends TestComponentParams<T> {
    harness: HarnessQuery<H>;
}

interface TestComponentResult<T> {
    fixture: ComponentFixture<T>;
    harnessLoader: HarnessLoader;
}

interface TestHarnessResult<T, H extends ComponentHarness> extends TestComponentResult<T> {
    harness: H;
}

/**
 * Configures the `TestBed` with the given imports and providers.
 *
 * When a `testComponent` is given it is added to the imports, created, and returned as a fixture together
 * with a harness loader rooted at it. When a `harness` query is given as well, that harness is loaded and
 * returned too. Each overload only exposes the values it can guarantee, so callers never have to
 * narrow away `undefined`.
 */
export function setupTestEnvironment<T, H extends ComponentHarness>(
    params: TestHarnessParams<T, H>,
): Promise<TestHarnessResult<T, H>>;

export function setupTestEnvironment<T>(params: TestComponentParams<T>): Promise<TestComponentResult<T>>;

export function setupTestEnvironment(params?: TestModuleParams): Promise<void>;

export async function setupTestEnvironment<T, H extends ComponentHarness>(
    params: TestModuleParams & Partial<TestHarnessParams<T, H>> = {},
): Promise<TestHarnessResult<T, H> | TestComponentResult<T> | void> {
    TestBed.configureTestingModule({
        imports: [...(params.imports ?? []), ...(params.testComponent ? [params.testComponent] : [])],
        providers: [...(params.providers ?? [])],
    });

    if (!params.testComponent) return;
    const fixture = TestBed.createComponent(params.testComponent);
    const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

    if (!params.harness) return { fixture: fixture, harnessLoader: harnessLoader };
    return {
        fixture: fixture,
        harnessLoader: harnessLoader,
        harness: await harnessLoader.getHarness(params.harness),
    };
}
