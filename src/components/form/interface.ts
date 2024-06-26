import IFormField from './formField/interface';
import IFormButton from './formButton/interface';
import ILink from '../link/interface';
import IFormError from './formError/interface';

interface IForm {
  name?: string,
  title?: string,
  subtitle?: string,
  fields?: IFormField[],
  buttons?: IFormButton[],
  link?: ILink,
  error: IFormError,
  attr?: { [key: string]: string },
  onSubmit?: (formObject: { [key: string]: FormDataEntryValue }) => void,
  events?: {
    submit: (event: Event) => void;
  };
}

export default IForm;
