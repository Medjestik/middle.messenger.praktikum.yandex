interface IProfileField {
  caption?: string,
  text?: string,
  name?: string,
  isControl?: boolean,
  attr?: { [key: string]: string | undefined },
}

export default IProfileField;
