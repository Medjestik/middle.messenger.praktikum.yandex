interface INavItem {
  index?: number,
  text?: string,
  url?: string,
  attr?: { [key: string]: string | undefined },
}

export default INavItem;
