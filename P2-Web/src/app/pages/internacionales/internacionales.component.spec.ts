import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternacionalesComponent } from './internacionales.component';

describe('InternacionalesComponent', () => {
  let component: InternacionalesComponent;
  let fixture: ComponentFixture<InternacionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternacionalesComponent]
    });
    fixture = TestBed.createComponent(InternacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
