import img from '../../images/registration.svg';

const data = {
  image: img,
  form: {
    fields: [
      {
        caption: 'Почта',
        type: 'email',
        id: 'registration-input-mail',
        name: 'email',
        validation: {
          required: true,
          pattern: /^(?=.*[@])[a-zA-Z0-9_-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)+$/,
          errorText: 'Неправильный формат почты',
        },
      },
      {
        caption: 'Логин',
        type: 'text',
        id: 'registration-input-login',
        name: 'login',
        validation: {
          required: true,
          pattern: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
          errorText: 'Неправильный формат логина',
        },
      },
      {
        caption: 'Имя',
        type: 'text',
        id: 'registration-input-firstName',
        name: 'first_name',
        validation: {
          required: true,
          pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
          errorText: 'Неправильный формат имени',
        },
      },
      {
        caption: 'Фамилия',
        type: 'text',
        id: 'registration-input-secondName',
        name: 'second_name',
        validation: {
          required: true,
          pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
          errorText: 'Неправильный формат фамилии',
        },
      },
      {
        caption: 'Телефон',
        type: 'tel',
        id: 'registration-input-phone',
        name: 'phone',
        validation: {
          required: true,
          pattern: /^\+?\d{10,15}$/,
          errorText: 'Неправильный формат телефона',
        },
      },
      {
        caption: 'Пароль',
        type: 'password',
        id: 'registration-input-password',
        name: 'password',
        validation: {
          required: true,
          pattern: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,40}$/,
          errorText: 'Неправильный формат пароля',
        },
      },
      {
        caption: 'Повторите пароль',
        type: 'password',
        id: 'registration-input-password-repeat',
        name: 'password_repeat',
        validation: {
          required: true,
          pattern: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,40}$/,
          errorText: 'Неправильный формат пароля',
        },
      },
    ],
    buttons: [
      {
        text: 'Зарегистрироваться',
        type: 'submit',
        id: 'registration-btn',
        color: 'primary',
      },
    ],
  },
};

export default data;
