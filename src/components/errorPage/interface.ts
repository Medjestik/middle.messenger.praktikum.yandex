import ILink from '../link/interface.ts';

interface IErrorPage {
  title?: string,
  img?: string,
  link?: ILink,
  attr?: { [key: string]: string | undefined },
}

export default IErrorPage;
