interface IAvatar {
  size?: string,
  url?: string,
  isEdit?: boolean,
  events?: {
    click: (event: Event) => void;
  };
}

export default IAvatar;
