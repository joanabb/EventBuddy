Registo.js

import { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  View,
  Alert,
} from 'react-native';

import { styles } from '../styles/styles';
import { database, auth } from '../services/firebaseConfig';

export default function Registo({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confpass, setConfpass] = useState('');

  /*const registo = async () => {
    if (username === '' || email === '' || pass === '' || confpass === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (pass !== confpass) {
      Alert.alert('Erro', 'As passwords não coincidem!');
      return;
    }

    try {
      // Verificar se o username já existe
      const result = await database
        .collection('users')
        .where('username', '==', username)
        .get();

      if (result.docs.length > 0) {
        Alert.alert('Erro!', 'Username já existe!');
        return;
      }

      // Criar utilizador na autenticação
      const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
      const user = userCredential.user;

      // Gravar dados na Firestore
      await database.collection('users').add({
        uid: user.uid,
        username: username,
        email: email,
      });

      Alert.alert('Sucesso!', 'Utilizador registado com sucesso!');
      navigation.navigate('Login');

    } catch (error) {
      console.log('Erro no registo:', error);
      Alert.alert('Erro no registo', error.message || 'Ocorreu um erro.');
    }
  };*/

  const registo = async () => {
  if (username === '' || email === '' || pass === '' || confpass === '') {
    Alert.alert('Erro', 'Preencha todos os campos!');
    return;
  }

  if (pass !== confpass) {
    Alert.alert('Erro', 'As passwords não coincidem!');
    return;
  }

  try {
    // Verificar se o username já existe
    const result = await database
      .collection('users')
      .where('username', '==', username)
      .get();

    if (result.docs.length > 0) {
      Alert.alert('Erro!', 'Username já existe!');
      return;
    }

    // Criar utilizador na autenticação
    const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
    const user = userCredential.user;

    console.log('UID após registo:', user.uid);

    // Criar o documento com o UID do utilizador como ID
    await database.collection('users').doc(user.uid).set({
      username: username,
      email: email,
      favorites: [],
      participations: [],
    });

    Alert.alert('Sucesso!', 'Utilizador registado com sucesso!');
    navigation.navigate('Login');

  } catch (error) {
    console.log('Erro no registo:', error);
    Alert.alert('Erro no registo', error.message || 'Ocorreu um erro.');
  }
};


 return (
  <ImageBackground
    source={require('../assets/fundo.jpg')}
    style={styles.bgImg}>

    <View style={styles.form}>
      <Text style={styles.formLbl}>Username</Text>
      <TextInput
        placeholder="Insira o seu username"
        style={styles.formInp}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.formLbl}>Email</Text>
      <TextInput
        placeholder="Insira o seu email"
        style={styles.formInp}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.formLbl}>Password</Text>
      <TextInput
        placeholder="Insira a sua password"
        secureTextEntry
        style={styles.formInp}
        value={pass}
        onChangeText={setPass}
      />

      <Text style={styles.formLbl}>Confirme password</Text>
      <TextInput
        placeholder="Confirme a sua password"
        secureTextEntry
        style={styles.formInp}
        value={confpass}
        onChangeText={setConfpass}
      />

      <TouchableOpacity style={styles.btn} onPress={registo}>
        <Text style={styles.btnTxt}>Registar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{ marginTop: 15 }}>
        <Text style={{ textAlign: 'center', color: 'white' }}>
          Já tem conta? Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RecuperarPass')}
        style={{ marginTop: 10 }}>
        <Text style={{ textAlign: 'center', color: 'white' }}>
          Esqueceu a password? Recupere aqui
        </Text>
      </TouchableOpacity>
    </View>

  </ImageBackground>
);
}

