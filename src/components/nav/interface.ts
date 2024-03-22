interface INav {
  links: { text: string; url: string; }[];
  attr?: { [key: string]: string },
}

export default INav;
