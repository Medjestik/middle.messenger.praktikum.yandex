interface IFormButton {
  color?: string,
  type?: string,
  id?: string,
  text?: string,
  attr?: { [key: string]: string | undefined },
  events?: { [key: string]: () => void },
  onClick?: () => void,
}

export default IFormButton;
