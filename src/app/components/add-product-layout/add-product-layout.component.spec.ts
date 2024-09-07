import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductLayoutComponent } from './add-product-layout.component';

describe('AddProductLayoutComponent', () => {
  let component: AddProductLayoutComponent;
  let fixture: ComponentFixture<AddProductLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
