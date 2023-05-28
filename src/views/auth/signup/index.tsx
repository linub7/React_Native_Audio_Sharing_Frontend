import colors from '@utils/colors';
import {FC, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import AuthInputFields from '@components/auth/auth-input-fields';

interface Props {}

interface IUserInfo {
  name: string;
  email: string;
  password: string;
}

const SignUpScreen: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: '',
    password: '',
    email: '',
  });
  const {name, password, email} = userInfo;

  console.log({name, password, email});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputFields
          placeholder="John Doe"
          label="Name"
          value={name}
          onChange={text => setUserInfo({...userInfo, name: text})}
          containerStyle={styles.marginBottom}
        />

        <AuthInputFields
          placeholder="john@gmail.com"
          label="Email"
          keyboardType="email-address"
          value={email}
          onChange={text => setUserInfo({...userInfo, email: text})}
          autoCapitalize="none"
          containerStyle={styles.marginBottom}
        />

        <AuthInputFields
          placeholder="********"
          label="Password"
          secureTextEntry={true}
          value={password}
          onChange={text => setUserInfo({...userInfo, password: text})}
        />
      </View>
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
