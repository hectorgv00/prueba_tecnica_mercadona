import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTornilloModalComponent } from './new-tornillo-modal.component';

describe('NewTornilloModalComponent', () => {
  let component: NewTornilloModalComponent;
  let fixture: ComponentFixture<NewTornilloModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTornilloModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTornilloModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
