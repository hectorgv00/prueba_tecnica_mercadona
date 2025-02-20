import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleColumnsModalComponent } from './shuffle-columns-modal.component';

describe('ShuffleColumnsModalComponent', () => {
  let component: ShuffleColumnsModalComponent;
  let fixture: ComponentFixture<ShuffleColumnsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShuffleColumnsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuffleColumnsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
