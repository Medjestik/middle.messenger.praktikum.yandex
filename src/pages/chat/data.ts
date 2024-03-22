import img from '../../images/chat.svg';

const data = {
  image: img,
  chats: [
    {
      avatar: '',
      name: 'Илья',
      message: {
        isMyMessage: true,
        text: 'стикер',
      },
      date: '2024-02-07T00:15:00Z',
      newMessageCount: 0,
    },
    {
      avatar: 'http://cdn.igromania.ru/mnt/games/d/a/c/5/9/c/323934/4ab8118b67d218fb_1920xH.jpg',
      name: 'Андрей',
      message: {
        isMyMessage: false,
        text: 'Изображение',
      },
      date: '2024-02-04T12:00:00Z',
      newMessageCount: 2,
    },
    {
      avatar: '',
      name: 'Киноклуб',
      message: {
        isMyMessage: false,
        text: 'Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный выпуск новостей!',
      },
      date: '2024-02-05T12:00:00Z',
      newMessageCount: 4,
    },
    {
      avatar: '',
      name: 'Вадим',
      message: {
        isMyMessage: true,
        text: 'Круто!',
      },
      date: '2023-10-13T12:00:00Z',
      newMessageCount: 0,
    },
    {
      avatar: 'https://images.thedirect.com/media/article_full/chewbacca.jpg',
      name: 'Day',
      message: {
        isMyMessage: false,
        text: 'Так увлёкся работой по курсу, что совсем забыл его анонсировать. Так увлёкся работой по курсу, что совсем забыл его анонсировать. Так увлёкся работой по курсу.',
      },
      date: '2022-02-06T12:00:00Z',
      newMessageCount: 0,
    },
  ],
};

export default data;
