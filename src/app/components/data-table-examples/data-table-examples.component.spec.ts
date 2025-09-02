import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableExamplesComponent } from './data-table-examples.component';

describe('DataTableExamplesComponent', () => {
  let component: DataTableExamplesComponent;
  let fixture: ComponentFixture<DataTableExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataTableExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
