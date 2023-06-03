import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {FormikHelpers} from 'formik';
import Toast from 'react-native-toast-message';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import AuthInputFields from '@components/auth/auth-input-fields';
import {signinValidationSchema} from '@utils/validationSchema';
import FormComponent from '@components/shared/form';
import SubmitButton from '@components/shared/buttons/submit';
import PasswordVisibilityIcon from '@ui/icons/password-visibility';
import AppLink from '@ui/links/app';
import AuthFormContainer from '@components/auth/form-container';
import {AuthStackParamList} from 'src/@types/navigation';
import {ISigninUser} from 'src/@types/auth';
import {signinHandler} from 'src/api/auth';
import {updateLoggedInStateAction, updateProfileAction} from 'src/store/auth';
import {Keys, saveToAsyncStorage} from '@utils/asyncStorage';

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const SigninScreen: FC<Props> = props => {
  const [privateIcon, setPrivateIcon] = useState(true);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: ISigninUser,
    actions: FormikHelpers<ISigninUser>,
  ) => {
    actions.setSubmitting(true);
    const {err, data} = await signinHandler(values);
    if (err) {
      actions.setSubmitting(false);
      return Toast.show({type: 'error', text1: err});
    }

    await saveToAsyncStorage(Keys.AUTH_TOKEN, data?.token);
    dispatch(updateProfileAction({profile: data?.user}));
    dispatch(updateLoggedInStateAction({loggedInState: true}));
    Toast.show({type: 'success', text1: 'Welcome back'});
    actions.setSubmitting(false);
  };

  const handleTogglePrivateIcon = () => setPrivateIcon(!privateIcon);

  return (
    <FormComponent
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signinValidationSchema}>
      <AuthFormContainer heading="Welcome Back!">
        <View style={styles.formContainer}>
          <AuthInputFields
            placeholder="john@gmail.com"
            label="Email"
            keyboardType="email-address"
            name="email"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />

          <AuthInputFields
            placeholder="********"
            label="Password"
            secureTextEntry={privateIcon}
            name="password"
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={privateIcon} />}
            onRightIconPress={handleTogglePrivateIcon}
          />
          <SubmitButton btnTitle="Sign in" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('lost-password')}
            />
            <AppLink
              title="Sign up"
              onPress={() => navigation.navigate('signup')}
            />
          </View>
        </View>
      </AuthFormContainer>
    </FormComponent>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 5,
  },
});

export default SigninScreen;
