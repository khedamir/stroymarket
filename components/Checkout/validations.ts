export const validationSchema = {
  name: {
    required: 'Укажите имя',
    minLength: { value: 2, message: 'Имя должно содержать не менее 2 символов' },
    maxLength: { value: 255, message: 'Имя должно содержать не более 255 символов' },
  },
  lastName: {
    required: 'Укажите фамилию',
    minLength: { value: 2, message: 'Фамилия должна содержать не менее 2 символов' },
    maxLength: { value: 255, message: 'Фамилия должна содержать не более 255 символов' },
  },
  patronymic: {
    required: 'Укажите отчество',
    minLength: { value: 2, message: 'Отчество должно содержать не менее 2 символов' },
    maxLength: { value: 255, message: 'Отчество должно содержать не более 255 символов' },
  },
  email: {
    required: 'Укажите электронную почту',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Неверный адрес электронной почты',
    },
  },
  address: {
    required: 'Укажите адрес',
    minLength: { value: 5, message: 'Адрес должен содержать не менее 5 символов' },
    maxLength: { value: 100, message: 'Адрес должен содержать не более 100 символов.' },
  },
  phone: {
    required: 'Укажите телефон',
    pattern: {
      value: /^(\+7\s)?\((\d{3})\)\s(\d{3})-(\d{2})-(\d{2})$/,
      message: 'Неверный телефон',
    },
  },
};
