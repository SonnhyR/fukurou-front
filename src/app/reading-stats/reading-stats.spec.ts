import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingStats } from './reading-stats';

describe('ReadingStats', () => {
  let component: ReadingStats;
  let fixture: ComponentFixture<ReadingStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
