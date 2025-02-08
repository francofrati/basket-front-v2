import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsSectionComponent } from './seasons-section.component';

describe('SeasonsSectionComponent', () => {
  let component: SeasonsSectionComponent;
  let fixture: ComponentFixture<SeasonsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
