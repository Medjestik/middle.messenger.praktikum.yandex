import IFormField from '../components/form/formField/interface';
import checkValidInput from './checkValidInput';

function checkValidForm(formObject: { [key: string]: FormDataEntryValue }, fields: IFormField[] | undefined): boolean {
  if (fields !== undefined) {
    let isValidForm = true;
    fields.forEach((field) => {
      if (field.name !== undefined) {
        const value = formObject[field.name] || '';
        if (typeof value === 'string') {
          if (field.validation !== undefined) {
            let isValidField = true;
            if (field.name === 'password_repeat') {
              isValidField = checkValidInput(value, field.validation.pattern) && (value === formObject.password);
            } else {
              isValidField = checkValidInput(value, field.validation.pattern);
            }
            if (!isValidField) {
              isValidForm = false;
            }
          }
        }
      }
    });
    return isValidForm;
  }
  return false;
}

export default checkValidForm;
