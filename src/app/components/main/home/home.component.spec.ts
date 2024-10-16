import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let fixture: ComponentFixture<HomeComponent>;

    let component: HomeComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => expect(component).not.toBeNull());
});
