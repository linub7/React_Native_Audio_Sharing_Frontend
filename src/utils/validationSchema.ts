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
    uri: Yup.string().required('Audio file uri is required!'),
    name: Yup.string().required('Audio file name is required!'),
    type: Yup.string().required('Audio file is type required!'),
    size: Yup.number().required('Audio file is size required!'),
  }),
  poster: Yup.object({
    uri: Yup.string(),
    name: Yup.string(),
    type: Yup.string(),
    size: Yup.number(),
  }),
});
