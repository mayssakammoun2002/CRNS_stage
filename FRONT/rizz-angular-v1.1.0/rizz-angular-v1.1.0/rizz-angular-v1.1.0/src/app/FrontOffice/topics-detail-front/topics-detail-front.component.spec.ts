import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsDetailFrontComponent } from './topics-detail-front.component';

describe('TopicsDetailFrontComponent', () => {
  let component: TopicsDetailFrontComponent;
  let fixture: ComponentFixture<TopicsDetailFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicsDetailFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicsDetailFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
