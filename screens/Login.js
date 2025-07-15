import {
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  View,
  Alert,
} from 'react-native';

import { styles } from '../styles/styles';
import { useState } from 'react';
import { database, auth } from '../services/firebaseConfig';

export default function Login({ navigation }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [pass, setPass] = useState('');

  const login = async () => {
    if (usernameOrEmail === '' || pass === '') {
      Alert.alert('Erro!', 'Preencha todos os campos!');
      return;
    }

    try {
      let email = usernameOrEmail;

      if (!usernameOrEmail.includes('@')) {
        const result = await database
          .collection('users')
          .where('username', '==', usernameOrEmail)
          .get();

        if (result.empty) {
          Alert.alert('Erro!', 'Username não encontrado!');
          return;
        }

        email = result.docs[0].data().email;
      }

      await auth.signInWithEmailAndPassword(email, pass);

      Alert.alert('Sucesso!', 'Login efetuado com sucesso!');
      console.log('UID atual:', auth.currentUser?.uid);
      navigation.navigate('Index');
    } catch (err) {
      console.log('Erro no login:', err);
      Alert.alert('Erro no login', err.message || 'Tente novamente.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/fundo.jpg')}
      style={styles.bgImg}>

      <View style={styles.form}>
        <Text style={styles.formLbl}>Username ou Email</Text>
        <TextInput
          placeholder="Insira o seu username ou email"
          style={styles.formInp}
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
        />

        <Text style={styles.formLbl}>Password</Text>
        <TextInput
          placeholder="Insira a sua password"
          secureTextEntry
          style={styles.formInp}
          value={pass}
          onChangeText={setPass}
        />

        <TouchableOpacity style={styles.btn} onPress={login}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Registo')}
          style={{ marginTop: 15 }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Não tens conta? Regista-te aqui
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RecuperarPass')}
          style={{ marginTop: 10 }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Esqueceste a password?
          </Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
}
