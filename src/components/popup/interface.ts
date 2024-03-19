interface IPopup {
  attr?: { [key: string]: string },
  isOpen?: boolean,
  onClose: () => void,
  [key: string]: any,
}

export default IPopup;
