interface IIconButton {
  icon?: string,
  type?: string,
  size?: string,
  attr?: { [key: string]: string | undefined },
  events?: {
    click: (event: Event) => void;
  };
}

export default IIconButton;
