import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TornillosPageComponent } from './tornillos-page.component';

describe('TornillosPageComponent', () => {
  let component: TornillosPageComponent;
  let fixture: ComponentFixture<TornillosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TornillosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TornillosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
