import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Details2Component } from './components/events/details2/details2.component';
import { Overview1Component } from './components/events/overview1/overview1.component';
import { Overview2Component } from './components/events/overview2/overview2.component';
import { HeaderComponent } from './components/main/header/header.component';
import { HomeComponent } from './components/main/home/home.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;

    let app: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderComponent,
                HomeComponent,
                Overview1Component,
                Overview2Component,
                Details2Component,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        spyOn(console, 'log').and.callFake(() => ({}));

        fixture = TestBed.createComponent(AppComponent);

        app = fixture.debugElement.componentInstance;
    });

    it('should create the app', () => expect(app).not.toBeNull());
});
