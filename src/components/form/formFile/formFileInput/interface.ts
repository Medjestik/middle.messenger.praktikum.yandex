interface IFormFile {
  type?: string,
  id?: string,
  name?: string,
  attr?: { [key: string]: string | undefined },
  events?: {
    change: (event: Event) => void;
  }
}

export default IFormFile;
