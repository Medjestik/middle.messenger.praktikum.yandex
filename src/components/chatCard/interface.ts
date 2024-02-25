interface IChatCard {
  avatar?: string,
  name?: string,
  date?: string,
  message?: {
    isMyMessage?: boolean,
    text?: string,
  },
  newMessageCount: number,
  events?: {
    click: (event: Event) => void;
  };
}

export default IChatCard;
