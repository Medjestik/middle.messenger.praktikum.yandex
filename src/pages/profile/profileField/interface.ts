interface IProfileField {
  caption?: string,
  text?: string,
  name?: string,
  isControl: boolean,
  attr?: { [key: string]: string | undefined },
  events?: {
    click: (event: Event) => void;
  };
}

export default IProfileField;
