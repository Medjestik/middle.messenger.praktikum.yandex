interface IDropdownItem {
  icon: string,
  text: string,
  attr?: { [key: string]: string },
  events?: {
    click: (event: Event) => void;
  };
}

export default IDropdownItem;
