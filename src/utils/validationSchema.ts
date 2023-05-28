import * as Yup from 'yup';

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
