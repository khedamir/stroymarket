import React, { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import CartContext from '../../../context/CartContext';
import ThemeContext from '../../../context/ThemeContext';
import { CartItem } from '../../../pages/basket';
import { makeOrderRequest, OrderRequestProduct } from '../../../request';
import Button from '../../Button';
import ErrorMessage from '../../ErrorMessage';
import Input from '../../Input';
import MaskedInput from '../../MaskedInput';
import { validationSchema } from '../validations';
import styles from './CheckoutForm.module.scss';

interface CheckoutFormProps {
  closeModal: () => void;
  data: any;
}

type FormValues = {
  name: string;
  lastName: string;
  patronymic: string;
  email: string;
  phone: string;
  address: string;
};

type FormTypes = 'lastName' | 'name' | 'patronymic' | 'phone' | 'email' | 'address';

const Forms: { placeholder: string; name: FormTypes; label: string; type: string }[] = [
  { placeholder: 'Иванов', name: 'lastName', label: 'Фамилия', type: 'text' },
  { placeholder: 'Иван', name: 'name', label: 'Имя', type: 'text' },
  { placeholder: 'Иванович', name: 'patronymic', label: 'Отчество', type: 'text' },
  { placeholder: '+7(000)-000-00-00', name: 'phone', label: 'Телефон', type: 'email' },
  { placeholder: 'example@mail.ru', name: 'email', label: 'Почта', type: 'email' },
  { placeholder: 'Город, улица, номер дома', name: 'address', label: 'Адрес', type: 'text' },
];

const CheckoutForm: FC<CheckoutFormProps> = ({ data, closeModal }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      lastName: '',
      patronymic: '',
      email: '',
      phone: '',
      address: '',
    },
    mode: 'onBlur',
  });
  const [sent, setSent] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { clearCart, products } = useContext(CartContext);

  const onSubmit = (formValues: FormValues) => {
    const requestProducts: OrderRequestProduct[] = [];
    Array.from(products.entries()).map(([productId, quantity]) => {
      requestProducts.push({
        id: productId,
        quantity,
        price: data.find((v: CartItem) => v.id === productId).price.active,
      });
    });
    const requestData = {
      name: formValues.name,
      lastName: formValues.lastName,
      patronymic: formValues.patronymic,
      email: formValues.email,
      phone: formValues.phone,
      address: formValues.address,
      products: requestProducts,
    };

    makeOrderRequest(requestData).then((r) => {
      setSent(true);
      closeModal();
      reset();
      setTimeout(() => {
        clearCart();
      }, 1000);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.checkoutForm} ${sent && styles.sent} ${styles[theme]}`}
    >
      {Forms.map((form) =>
        form.name === 'phone' ? (
          <label className={`${errors.phone && styles.error}`} key={'phone'} htmlFor={'phone'}>
            Телефон
            <MaskedInput
              control={control}
              sent={sent}
              name={'phone'}
              rules={validationSchema.phone}
              mask={'+7 (999) 999-99-99'}
              placeholder={'+7 (999) 999-99-99'}
            />
            {errors.phone && <ErrorMessage text={errors.phone?.message || ''} />}
          </label>
        ) : (
          <label key={form.name} htmlFor="">
            {form.label}
            <Input
              readOnly={sent}
              {...register(`${form.name}`, validationSchema[form.name])}
              placeholder={form.placeholder}
            />
            {errors[form.name] && <ErrorMessage text={errors[form.name]?.message || ''} />}
          </label>
        )
      )}
      <span className={styles.formButton}>
        <Button disabled={sent} styleType="blue">
          {sent ? 'С вами свяжется наш менеджер' : 'Отправить заказ'}
        </Button>
      </span>
    </form>
  );
};

export default CheckoutForm;
