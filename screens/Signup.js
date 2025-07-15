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
import { database } from '../services/firebaseConfig';
import { auth } from '../services/firebaseConfig';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confpass, setConfpass] = useState('');

// verifica se os campos estão todos preenchidos
  const registo = async () => {
    if (username == '' || email == '' || pass == '' || confpass == '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    //verificar se as passes são iguais
    if (pass != confpass) {
      Alert.alert('Erro!', 'As passwords não coincidem!');
      return;
    }
    // ver se o username xiste
      const result = await database.collection("users").where("username", "==", username).get();
    if(result.docs.length > 0){
          Alert.alert("Erro!","Username já existe!");
          return
    }
    // verificar se o email existe
    const result2 = await database.collection("users").where("email","==",email).get();
    if(result2.docs.length >0) {
      Alert.alert("Erro!","Email já existe");
      return
    }
    // inserir na base de dados
    database.collection("users").add({
      username:username,
      email: email,
      password: pass
    }).then ( () => {
      Alert.alert("Mensagem","Utilizador registado com sucesso!");
      navigation.navigate("Login")
    })
    //acrescentado para autenticar com email e password
      auth.createUserWithEmailAndPassword(email,pass).then((user) => console.log(user)).catch( (err) => console.log(err))
 
  }
  return (
    <ImageBackground
      source={require('../assets/fundo.jpg')}
      style={styles.bgImg}>
      <View style={styles.form}>
        <Text style={styles.formLbl}>Username</Text>
        <TextInput
          placeholder="Enter your username"
          style={styles.formInp}
          value={username}
          onChangeText={(text) => setUsername(text)}></TextInput>
        <Text style={styles.formLbl}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.formInp}
          value={email}
          onChangeText={(text) => setEmail(text)}></TextInput>
        <Text style={styles.formLbl}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          style={styles.formInp}
          value={pass}
          onChangeText={(text) => setPass(text)}></TextInput>
        <Text style={styles.formLbl}>Confirm password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          style={styles.formInp}
          value={confpass}
          onChangeText={(text) => setConfpass(text)}></TextInput>

        <TouchableOpacity style={styles.btn} onPress={registo}>
          <Text style={styles.btnTxt}> Registo </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}