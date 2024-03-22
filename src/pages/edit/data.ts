const data = {
  form: {
    fields: [
      {
        caption: 'Почта',
        type: 'email',
        id: 'edit-input-mail',
        name: 'email',
        value: 'ivan-kostyulin@yandex.ru',
        validation: {
          required: true,
          pattern: /^(?=.*[@])[a-zA-Z0-9_-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)+$/,
          errorText: 'Неправильный формат почты',
        },
      },
      {
        caption: 'Логин',
        type: 'text',
        id: 'edit-input-login',
        name: 'login',
        value: 'ivanivanov',
        validation: {
          required: true,
          pattern: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
          errorText: 'Неправильный формат логина',
        },
      },
      {
        caption: 'Имя',
        type: 'text',
        id: 'edit-input-firstName',
        name: 'first_name',
        value: 'Иван',
        validation: {
          required: true,
          pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
          errorText: 'Неправильный формат имени',
        },
      },
      {
        caption: 'Фамилия',
        type: 'text',
        id: 'edit-input-secondName',
        name: 'second_name',
        value: 'Иванов',
        validation: {
          required: true,
          pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
          errorText: 'Неправильный формат фамилии',
        },
      },
      {
        caption: 'Имя в чате',
        type: 'text',
        id: 'edit-input-displayName',
        name: 'display_name',
        value: 'Ivan',
        validation: {
          required: true,
          pattern: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
          errorText: 'Неправильный формат имя в чате',
        },
      },
      {
        caption: 'Телефон',
        type: 'tel',
        id: 'edit-input-phone',
        name: 'phone',
        value: '+79099673030',
        validation: {
          required: true,
          pattern: /^\+?\d{10,15}$/,
          errorText: 'Неправильный формат телефона',
        },
      },
    ],
    buttons: [
      {
        text: 'Сохранить',
        type: 'submit',
        id: 'edit-btn',
        color: 'primary',
      },
    ],
  },
};

export default data;
