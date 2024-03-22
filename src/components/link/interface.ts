interface ILink {
  text?: string,
  url?: string,
  attr?: { [key: string]: string | undefined },
  events?: { [key: string]: (event: Event) => void },
}

export default ILink;
