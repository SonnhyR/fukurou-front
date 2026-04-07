import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Audiobooks } from './audiobooks';

describe('Audiobooks', () => {
  let component: Audiobooks;
  let fixture: ComponentFixture<Audiobooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Audiobooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Audiobooks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
