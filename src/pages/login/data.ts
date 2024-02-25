import img from '../../images/chat.svg';

const data = {
  image: img,
  form: {
    fields: [
      {
        caption: 'Логин',
        type: 'text',
        id: 'login-input-login',
        name: 'login',
        validation: {
          required: true,
          pattern: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
          errorText: 'Неправильный формат логина',
        },
      },
      {
        caption: 'Пароль',
        type: 'password',
        id: 'login-input-password',
        name: 'password',
        validation: {
          required: true,
          pattern: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,40}$/,
          errorText: 'Неправильный формат пароля',
        },
      },
    ],
    buttons: [
      {
        text: 'Авторизоваться',
        type: 'submit',
        id: 'login-btn',
        color: 'primary',
      },
    ],
  },
};

export default data;
