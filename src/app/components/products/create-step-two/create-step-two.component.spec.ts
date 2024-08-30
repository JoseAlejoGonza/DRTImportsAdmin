import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStepTwoComponent } from './create-step-two.component';

describe('CreateStepTwoComponent', () => {
  let component: CreateStepTwoComponent;
  let fixture: ComponentFixture<CreateStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStepTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
