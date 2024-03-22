interface IFormFile {
  type?: string,
  id?: string,
  text?: string,
  name?: string,
  value?: string,
  required?: boolean,
  attr?: { [key: string]: string | undefined },
  onChange?: (e: Event) => void,
}

export default IFormFile;
