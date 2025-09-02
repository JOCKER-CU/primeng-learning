import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastExamplesComponent } from './toast-examples.component';

describe('ToastExamplesComponent', () => {
  let component: ToastExamplesComponent;
  let fixture: ComponentFixture<ToastExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
