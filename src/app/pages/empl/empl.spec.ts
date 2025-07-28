import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empl } from './empl';

describe('Empl', () => {
  let component: Empl;
  let fixture: ComponentFixture<Empl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Empl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
