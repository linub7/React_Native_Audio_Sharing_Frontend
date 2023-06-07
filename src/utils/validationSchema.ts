import * as Yup from 'yup';
import {categories} from './categories';

export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .trim('Name is required!')
    .min(2, 'Invalid Name')
    .required('Name is required!'),
  email: Yup.string()
    .trim('Email is required!')
    .email('Invalid Email')
    .required('Email is required!'),
  password: Yup.string()
    .trim('Password is required!')
    .min(8, 'Password is too shot!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      'Password is too simple!',
    )
    .required('Password is required!'),
});

export const signinValidationSchema = Yup.object({
  email: Yup.string()
    .trim('Email is required!')
    .email('Invalid Email')
    .required('Email is required!'),
  password: Yup.string()
    .trim('Password is required!')
    .min(8, 'Password is too shot!')
    .required('Password is required!'),
});

export const lostPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .trim('Email is required!')
    .email('Invalid Email')
    .required('Email is required!'),
});

export const audioInfoValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  about: Yup.string().required('About is required'),
  category: Yup.string()
    .oneOf(categories, 'Invalid Category')
    .required('Category is required'),
  file: Yup.object({
    uri: Yup.string().required('Audio file is required!'),
    name: Yup.string().required('Audio file is required!'),
    type: Yup.string().required('Audio file is required!'),
    size: Yup.number().required('Audio file is required!'),
  }),
  poster: Yup.object({
    uri: Yup.string(),
    name: Yup.string(),
    type: Yup.string(),
    size: Yup.number(),
  }),
});

export const newPlaylistValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  resId: Yup.string(),
  visibility: Yup.string()
    .oneOf(['public', 'private'], 'visibility must be public or private')
    .required('Visibility is required'),
});

export const oldPlaylistValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  // this is gonna validate audio id
  item: Yup.string(),
  visibility: Yup.string().oneOf(
    ['public', 'private'],
    'visibility must be public or private',
  ),
});
