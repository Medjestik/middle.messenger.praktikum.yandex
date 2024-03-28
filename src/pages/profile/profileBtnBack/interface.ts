interface IProfileBtnBack {
  attr?: { [key: string]: string | undefined },
  onClick: () => void;
  events?: {
    click: (event: Event) => void;
  };
}

export default IProfileBtnBack;
