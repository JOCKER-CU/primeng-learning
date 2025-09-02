import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputExamplesComponent } from './input-examples.component';

describe('InputExamplesComponent', () => {
  let component: InputExamplesComponent;
  let fixture: ComponentFixture<InputExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
