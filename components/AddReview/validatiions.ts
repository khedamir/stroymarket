export const validationSchema = {
  name: {
    required: 'Укажите имя',
    minLength: { value: 2, message: 'Имя должно содержать не менее 2 символов' },
    maxLength: { value: 255, message: 'Имя должно содержать не более 255 символов' },
  },
  email: {
    required: 'Укажите электронную почту',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Неверный адрес электронной почты',
    },
  },
  comment: {
    required: 'Заполните комментарий',
    minLength: { value: 1, message: 'Комментарий не может быть пустым' },
    maxLength: { value: 500, message: 'Комментарий должен быть не длиннее 200 символов' },
  },
  rating: {
    required: 'Укажите рейтинг',
    min: { value: 1, message: 'Укажите рейтинг' },
    max: { value: 5, message: 'Укажите рейтинг' },
  },
};
