import React, { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CommentResponse } from '../../@types/types';
import ThemeContext from '../../context/ThemeContext';
import { addCommentRequest, getCommentsRequest } from '../../request';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import Grade from '../Grade';
import Input from '../Input';
import styles from './AddRreview.module.scss';
import { validationSchema } from './validatiions';

interface AddReviewProps {
  comments: CommentResponse[];
  setComments: ([]: CommentResponse[]) => void;
  productId: number;
}

type FormValues = {
  name: string;
  email: string;
  comment: string;
  rating: number;
};

const AddReview: FC<AddReviewProps> = ({ comments, setComments, productId }) => {
  const { theme } = useContext(ThemeContext);

  const [sent, setSent] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      comment: '',
      rating: 0,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormValues) => {
    const requestData = {
      ...data,
      productId,
    };
    await addCommentRequest(requestData);
    const comments = await getCommentsRequest(productId);
    setComments(comments);
    // setSent(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.reviewForm} ${styles[theme]} ${sent && styles.sent}`}>
      <h3>Ваш отзыв</h3>
      <label htmlFor="">
        Ваше имя
        <Input readOnly={sent} {...register('name', validationSchema.name)} placeholder="Имя" />
        {errors.name && <ErrorMessage text={errors.name.message || ''} />}
      </label>

      <label htmlFor="">
        Почта
        <Input readOnly={sent} {...register('email', validationSchema.email)} placeholder="example@mail.ru" />
        {errors.email && <ErrorMessage text={errors.email.message || ''} />}
      </label>

      <label htmlFor="">
        Комментарий
        <textarea
          readOnly={sent}
          {...register('comment', validationSchema.comment)}
          placeholder="Напишите комментарий"
        ></textarea>
        {errors.comment && <ErrorMessage text={errors.comment.message || ''} />}
      </label>

      <div className={styles.buttonWrapper}>
        <span className={styles.formRating}>
          <Grade onChange={(grade) => setValue('rating', grade)} clickable={true} />
          <input type={'hidden'} {...register('rating', validationSchema.rating)} />
        </span>
        <Button disabled={sent} type="submit" styleType={sent ? 'success' : 'yellow'}>
          {sent ? 'Отправлено' : 'Оставить отзыв'}
        </Button>
      </div>
      {errors.rating && (
        <span className={styles.ratingError}>
          <ErrorMessage text={errors.rating.message || ''} />
        </span>
      )}
    </form>
  );
};

export default AddReview;
