import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AuthInputFields from '@components/auth/auth-input-fields';
import {signupValidationSchema} from '@utils/validationSchema';
import FormComponent from '@components/shared/form';
import SubmitButton from '@components/shared/buttons/submit';
import PasswordVisibilityIcon from '@ui/icons/password-visibility';
import AppLink from '@ui/links/app';
import AuthFormContainer from '@components/auth/form-container';

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUpScreen: FC<Props> = props => {
  const [privateIcon, setPrivateIcon] = useState(true);

  const handleSubmit = (values: Object) => {
    console.log(values);
  };

  const handleTogglePrivateIcon = () => setPrivateIcon(!privateIcon);

  return (
    <FormComponent
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signupValidationSchema}>
      <AuthFormContainer
        heading="Welcome!"
        subheading="Let's get started by creating your account.">
        <View style={styles.formContainer}>
          <AuthInputFields
            placeholder="John Doe"
            label="Name"
            name="name"
            containerStyle={styles.marginBottom}
          />

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
          <SubmitButton btnTitle="Sign up" />
          <View style={styles.linkContainer}>
            <AppLink title="I Lost My Password" />
            <AppLink title="Sign in" />
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

export default SignUpScreen;
