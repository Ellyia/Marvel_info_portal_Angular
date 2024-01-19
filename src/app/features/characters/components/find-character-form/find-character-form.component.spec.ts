import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCharacterFormComponent } from './find-character-form.component';

describe('FindCharacterFormComponent', () => {
  let component: FindCharacterFormComponent;
  let fixture: ComponentFixture<FindCharacterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindCharacterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindCharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
