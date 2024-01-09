import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCharacterComponent } from './random-character.component';

describe('RandomCharacterComponent', () => {
  let component: RandomCharacterComponent;
  let fixture: ComponentFixture<RandomCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomCharacterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
