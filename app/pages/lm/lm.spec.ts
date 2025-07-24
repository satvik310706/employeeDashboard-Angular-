import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lm } from './lm';

describe('Lm', () => {
  let component: Lm;
  let fixture: ComponentFixture<Lm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
