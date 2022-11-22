import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Overview1Component } from './overview1.component';

describe('Overview1Component', () => {
    let component: Overview1Component;
    let fixture: ComponentFixture<Overview1Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [Overview1Component],
        }).compileComponents();
    });

    beforeEach(() => {
        spyOn(console, 'log').and.callFake(() => ({}));

        fixture = TestBed.createComponent(Overview1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
