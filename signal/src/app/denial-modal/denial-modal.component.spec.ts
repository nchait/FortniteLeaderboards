import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenialModalComponent } from './denial-modal.component';

describe('DenialModalComponent', () => {
  let component: DenialModalComponent;
  let fixture: ComponentFixture<DenialModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenialModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
