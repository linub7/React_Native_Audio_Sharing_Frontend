import {FC} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

import colors from '@utils/colors';
import AuthInputFields from '@components/auth/auth-input-fields';
import {signupValidationSchema} from '@utils/validationSchema';
import FormComponent from '@components/shared/form';
import SubmitButton from '@components/shared/buttons/submit';

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUpScreen: FC<Props> = props => {
  const handleSubmit = (values: Object) => {
    console.log(values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FormComponent
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={signupValidationSchema}>
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
            secureTextEntry={true}
            name="password"
            containerStyle={styles.marginBottom}
          />
          <SubmitButton btnTitle="Sign up" />
        </View>
      </FormComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default SignUpScreen;
