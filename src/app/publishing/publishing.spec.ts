import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publishing } from './publishing';

describe('Publishing', () => {
  let component: Publishing;
  let fixture: ComponentFixture<Publishing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Publishing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publishing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
