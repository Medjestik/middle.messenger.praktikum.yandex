interface IChatCard {
  id?: number,
  avatar?: string,
  title?: string,
  ownerId?: number,
  lastMessage?: {
    isEmpty?: boolean,
    owner?: boolean,
    time?: string,
    content?: string,
  },
  newMessages?: number,
  events?: {
    click: (event: Event) => void;
  };
}

export default IChatCard;
