import img from '../../images/registration.svg';

const registrationData = {
  image: img,
  form: {
    title: 'Регистрация',
    id: 'registration-form',
    fields: [
      {
        caption: 'Почта',
        type: 'email',
        id: 'registration-input-mail',
        name: 'email',
      },
      {
        caption: 'Логин',
        type: 'text',
        id: 'registration-input-login',
        name: 'login',
      },
      {
        caption: 'Имя',
        type: 'text',
        id: 'registration-input-firstName',
        name: 'first_name',
      },
      {
        caption: 'Фамилия',
        type: 'text',
        id: 'registration-input-secondName',
        name: 'second_name',
      },
      {
        caption: 'Телефон',
        type: 'tel',
        id: 'registration-input-phone',
        name: 'phone',
      },
      {
        caption: 'Пароль',
        type: 'password',
        id: 'registration-input-password',
        name: 'password',
      },
      {
        caption: 'Повторите пароль',
        type: 'password',
        id: 'registration-input-password-repeat',
        name: 'password_repeat',
      },
    ],
    buttons: [
      {
        text: 'Зарегистрироваться',
        type: 'submit',
        id: 'registration-btn',
        color: 'primary',
      }
    ],
    link: {
      text: 'Уже есть аккаунт?',
      url: '/pages/login/login.html',
    }
  },
}

export default registrationData;
