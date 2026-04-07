import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fanfics } from './fanfics';

describe('Fanfics', () => {
  let component: Fanfics;
  let fixture: ComponentFixture<Fanfics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fanfics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fanfics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
