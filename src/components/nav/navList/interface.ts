interface INavList {
  links: { text: string; url: string; }[];
  attr?: { [key: string]: string | undefined },
}

export default INavList;
