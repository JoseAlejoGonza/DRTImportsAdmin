import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStepOneComponent } from './create-step-one.component';

describe('CreateStepOneComponent', () => {
  let component: CreateStepOneComponent;
  let fixture: ComponentFixture<CreateStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStepOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
