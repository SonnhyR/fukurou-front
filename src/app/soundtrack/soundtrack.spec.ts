import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Soundtrack } from './soundtrack';

describe('Soundtrack', () => {
  let component: Soundtrack;
  let fixture: ComponentFixture<Soundtrack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Soundtrack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Soundtrack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
