import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsInfoComponent } from './comics-info.component';

describe('ComicsInfoComponent', () => {
  let component: ComicsInfoComponent;
  let fixture: ComponentFixture<ComicsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComicsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
