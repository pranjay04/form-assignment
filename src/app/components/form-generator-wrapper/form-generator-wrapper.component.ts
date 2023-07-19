import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  DraggableFormFieldDataType,
  FormFieldList,
} from 'src/app/form/constants';
import { FileHelperService } from 'src/app/service/file-helper.service';

@Component({
  selector: 'app-form-generator-wrapper',
  templateUrl: './form-generator-wrapper.component.html',
  styleUrls: ['./form-generator-wrapper.component.scss'],
})
export class FormGeneratorWrapperComponent {
  @ViewChild('importInputFile')
  public fileInput!: ElementRef;

  public formFieldList = FormFieldList;
  public dropData: DraggableFormFieldDataType[] = [];

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fileHelper: FileHelperService
  ) {
    this.formGroup = this.formBuilder.group({});
  }

  drop(event: CdkDragDrop<DraggableFormFieldDataType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const newItemData: DraggableFormFieldDataType =
        event.previousContainer.data[event.previousIndex];
      const newId = `${Math.random()}`;
      newItemData.id = newId;
      const validators =
        newItemData.validators
          ?.map((val) => this.getValidatorbyName(val))
          ?.filter((val) => val) ?? [];
      this.formGroup.addControl(
        `${newId}`,
        new FormGroup({
          [newItemData.label]: new FormControl('', [
            ...(validators as Array<ValidatorFn>),
          ]),
          formLabel: new FormControl('Enter your label here', [
            Validators.required,
          ]),
        })
      );
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private getValidatorbyName(validatorName: string) {
    switch (validatorName) {
      case 'email':
        return Validators.email;
      case 'required':
        return Validators.required;
      default:
        return null;
    }
  }

  public handleOnExport(ev: Event) {
    const formValueAll = this.formGroup.value;
    const formDataToExport = this.dropData?.map((el) => {
      const formValue = formValueAll[el.id];
      return {
        formLabel: formValue.formLabel,
        value: formValue[el.label],
        validators: el.validators ?? [],
        type: el.type,
        fieldType: el.fieldType,
        label: el.label,
      };
    });
    this.fileHelper.downloadTextFile(
      'form-json.json',
      JSON.stringify({
        formContent: formDataToExport,
        timestamp: new Date().getTime(),
      })
    );
  }

  public handleOnImport(ev: Event) {
    const el: HTMLInputElement = this.fileInput.nativeElement;
    el.click();
  }

  public handleFileChange(ev: Event) {
    const el: HTMLInputElement = this.fileInput.nativeElement;
    const file = el.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const string = reader.result;
          const json = JSON.parse(string as string);
          this.setFormDataFromJson(json);
        } catch (err) {
          console.error("Something went wrong - ", err);
        }
      };
      reader.readAsText(file);
    }
  }

  private setFormDataFromJson(json: any) {
    const formContent = json?.formContent;
    this.formGroup = this.formBuilder.group({});
    this.dropData = [];
    formContent.forEach((element: any) => {
      const newId = `${Math.random()}`;
      const validators =
        element.validators
          ?.map((val: any) => this.getValidatorbyName(val))
          ?.filter((val: any) => val) ?? [];

      this.formGroup.addControl(
        `${newId}`,
        new FormGroup({
          [element.label]: new FormControl(element.value, [
            ...(validators as Array<ValidatorFn>),
          ]),
          formLabel: new FormControl(
            element.formLabel || 'Enter your label here',
            [Validators.required]
          ),
        })
      );

      this.dropData.push({
        id: newId,
        label: element.label,
        fieldType: element.fieldType,
        validators: element.validators,
        type: element.type,
      })
    });
  }
}