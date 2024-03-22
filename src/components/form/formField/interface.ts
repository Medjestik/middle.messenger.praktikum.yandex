interface IFormField {
  caption?: string,
  type?: string,
  id?: string,
  name?: string,
  errorText?: string,
  value?: string,
  validation?: {
    required: boolean,
    pattern: RegExp,
    errorText: string,
  }
  attr?: { [key: string]: string | undefined },
}

export default IFormField;
