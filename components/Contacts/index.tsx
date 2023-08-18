import Link from 'next/link';
import React, { ChangeEvent, useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ThemeContext, { THEME } from '../../context/ThemeContext';
import AddFile from '../../public/images/add-file.svg';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import MaskedInput from '../MaskedInput';
import styles from './Contacts.module.scss';
import { validationSchema } from './validations';

type FormValues = {
  name: string;
  email: string;
  address: string;
  phone: string;
  comment: string;
  file: FileList;
};

type FormTypes = 'name' | 'email' | 'address' | 'comment';

const Forms: { placeholder: string; name: FormTypes; label: string; type: string }[] = [
  { placeholder: 'Имя', name: 'name', label: 'Ваше имя', type: 'text' },
  { placeholder: 'example@mail.ru', name: 'email', label: 'Почта', type: 'email' },
  { placeholder: 'Город, улица, номер дома', name: 'address', label: 'Адрес строительного дома', type: 'text' },
];

const Contacts = () => {
  const { theme } = useContext(ThemeContext);

  const [fileName, setFileName] = useState('');

  const [sent, setSent] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      comment: '',
    },
    mode: 'onBlur',
  });
  const onSubmit = (data: FormValues) => {
    setSent(false);
  };
  return (
    <section className={`${styles.contacts} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Закажите расчет материалов, которые необходимы</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} ${sent && styles.sent}`}>
          <div className={styles.inputs}>
            {Forms.map((form) => (
              <label className={`${errors[form.name] && styles.error}`} key={form.name} htmlFor={form.name}>
                {form.label}
                <Controller
                  name={form.name}
                  control={control}
                  rules={validationSchema[form.name]}
                  render={({ field }) => (
                    <Input readOnly={sent} id={form.name} type={form.type} placeholder={form.placeholder} {...field} />
                  )}
                />
                {errors[form.name] && <ErrorMessage text={errors[form.name]?.message || ''} />}
              </label>
            ))}
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
            <label className={styles.comment} htmlFor="comment">
              Комментарий
              <textarea
                readOnly={sent}
                id="comment"
                {...register('comment', validationSchema.comment)}
                placeholder="Напишите, что вы хотели бы узнать (?)"
              ></textarea>
            </label>
            <span className={`${styles.addFile} ${fileName && styles.active} ${errors.file && styles.error}`}>
              <label htmlFor="file">
                <input
                  id="file"
                  {...register('file', validationSchema.file)}
                  onChange={handleFileChange}
                  className={styles.file}
                  type="file"
                  accept=".jpg, .jpeg, .bmp, .png, .pdf"
                />
                <AddFile />
                <span>{fileName !== '' ? fileName : 'Прикрепить проект дома'}</span>
              </label>
              {errors.file && <ErrorMessage text={errors.file?.message || ''} />}
            </span>
          </div>

          <fieldset>
            <legend>
              <Link href="tel:88001014376">8(800)101-43-76</Link>
            </legend>
            <p>Вы можете позвонить нашему консультанту. Он с радостью поможет оформить заказ</p>
          </fieldset>

          <Button disabled={sent} type="submit" styleType={theme === THEME.DARK ? 'blue' : 'blueLight'}>
            {sent ? 'Отправлено' : 'Отправить заказ'}
          </Button>
        </form>
      </div>
    </section>
  );
};
export default Contacts;
