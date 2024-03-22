export interface IPopupSearch {
  isOpen?: boolean
  placeholder?: string
  value?: string
  onSearch: (text: string) => void
  attr?: { [key: string]: string }
}
export interface IPopupSearchInput {
  isOpen?: boolean
  placeholder?: string
  value?: string
  attr?: { [key: string]: string }
  events: {
    change: (event: Event) => void;
  };
}
export interface IPopupSearchBtn {
  attr?: { [key: string]: string }
  events: {
    click: (event: Event) => void;
  };
}
