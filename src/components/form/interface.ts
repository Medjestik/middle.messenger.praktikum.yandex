import IFormField from './formField/interface.ts';
import IFormButton from './formButton/interface.ts';
import ILink from '../link/interface.ts';
import IFormError from './formError/interface.ts';

interface IForm {
  name?: string,
  title?: string,
  fields?: IFormField[],
  buttons?: IFormButton[],
  link?: ILink,
  error: IFormError,
  attr?: { [key: string]: string },
  onSubmit?: (formData: Record<string, unknown>) => void,
  events?: {
    submit: (event: Event) => void;
  };
}

export default IForm;
