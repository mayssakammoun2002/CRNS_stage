import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HajerComponent } from './hajer.component';

describe('HajerComponent', () => {
  let component: HajerComponent;
  let fixture: ComponentFixture<HajerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HajerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HajerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
