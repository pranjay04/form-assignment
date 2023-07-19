import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGeneratorWrapperComponent } from './form-generator-wrapper.component';

describe('FormGeneratorWrapperComponent', () => {
  let component: FormGeneratorWrapperComponent;
  let fixture: ComponentFixture<FormGeneratorWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormGeneratorWrapperComponent]
    });
    fixture = TestBed.createComponent(FormGeneratorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
