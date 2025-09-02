import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExamplesComponent } from './dialog-examples.component';

describe('DialogExamplesComponent', () => {
  let component: DialogExamplesComponent;
  let fixture: ComponentFixture<DialogExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
