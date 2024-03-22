import ILink from '../link/interface';

interface IErrorPage {
  title?: string,
  img?: string,
  link?: ILink,
  attr?: { [key: string]: string | undefined },
}

export default IErrorPage;
