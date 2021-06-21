import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

  let fixture: ComponentFixture<HeaderComponent>;

  let component: HeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);

    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => expect(component).not.toBeNull());
});
