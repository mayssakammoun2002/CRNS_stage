import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsListingFrontComponent } from './topics-listing-front.component';

describe('TopicsListingFrontComponent', () => {
  let component: TopicsListingFrontComponent;
  let fixture: ComponentFixture<TopicsListingFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicsListingFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicsListingFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
