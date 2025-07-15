import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  View,
  Alert,
} from 'react-native';

import { styles } from '../styles/styles';
import { auth } from '../services/firebaseConfig';

export default function RecuperarPass({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor insira o seu email');
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Sucesso', 'Enviado email de recuperação de password');
        navigation.navigate('Index');
      })
      .catch(error => {
        Alert.alert('Erro', error.message);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/fundo2.jpeg')}
      style={styles.bgImg}>
      <View style={styles.form}>
        <Text style={styles.formLbl}>Recupere a seu password</Text>
        <TextInput
          placeholder="Insira o seu email"
          value={email}
          onChangeText={setEmail}
          style={styles.formInp}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.btn} onPress={handlePasswordReset}>
          <Text style={styles.link}>Recuperar</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkTxt}>(Retroceder)</Text>
          <Text style={styles.link} onPress={() => navigation.navigate('Index')}>
            Login
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

