import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoinsDialogComponent } from './select-coins-dialog.component';

describe('SelectCoinsDialogComponent', () => {
  let component: SelectCoinsDialogComponent;
  let fixture: ComponentFixture<SelectCoinsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCoinsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectCoinsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
