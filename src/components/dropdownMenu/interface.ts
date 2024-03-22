interface IDropdownMenu {
  attr?: { [key: string]: string },
  position: string,
  options: {
    icon: string,
    text: string,
    onClick: () => void,
  } [],
  isShow: boolean,
  onClose: () => void,
  events?: {
    click: (event: Event) => void;
  };
}

export default IDropdownMenu;
