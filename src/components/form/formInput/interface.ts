interface IFormInput {
  type?: string,
  id?: string,
  name?: string,
  value?: string,
  required?: boolean,
  attr?: { [key: string]: string | undefined },
  events?: {
    blur: (event: Event) => void;
  }
}

export default IFormInput;
