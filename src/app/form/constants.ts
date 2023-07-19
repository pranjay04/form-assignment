

export interface DraggableFormFieldDataType {
  id: string;
  label: string;
  fieldType: string;
  type?: string;
  validators?: string[]
}

export const FormFieldList: DraggableFormFieldDataType[] = [
  { 
    id: 'tywreyrqwe',
    label: 'Text Field',
    fieldType: 'input',
    type: 'text',
  },
  {
    id: 'iqefivbshbv',
    label: 'Email Field',
    fieldType: 'input',
    type: 'email',
    validators: ['email']
  },
  {
    id: 'inyiw75cn475',
    label: 'Password Field',
    fieldType: 'input',
    type: 'password',
    validators: ['password']
  },
  {
    id: '82cn594cn5',
    label: 'Number Field',
    fieldType: 'input',
    type: 'number',
  },
  {
    id: '87bc4o87n6c5',
    label: 'Text Area Field',
    fieldType: 'textarea',
  },
];
