import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBooks } from './game-books';

describe('GameBooks', () => {
  let component: GameBooks;
  let fixture: ComponentFixture<GameBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBooks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
