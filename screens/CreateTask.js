import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from '../styles/styles';

export default function CreateTask() {
  const [taskDesc, setTaskDesc] = useState('');

  const handleAddTask = () => {
    if (!taskDesc.trim()) {
      Alert.alert('Erro', 'A descrição da tarefa não pode estar vazia.');
      return;
    }

    // Aqui é onde irias adicionar a lógica para guardar a tarefa (ex: Firebase, SQLite, etc.)
    Alert.alert('Tarefa adicionada!', `Descrição: ${taskDesc}`);

    // Limpa o campo
    setTaskDesc('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.bgImg, { padding: 20 }]}
    >
      <View style={styles.form}>
        <Text style={styles.formLbl}>Descrição da Tarefa</Text>
        <TextInput
          style={styles.formInp}
          placeholder="Escreve aqui a tarefa..."
          placeholderTextColor="#999"
          value={taskDesc}
          onChangeText={setTaskDesc}
          multiline
        />
        <TouchableOpacity style={styles.btn} onPress={handleAddTask}>
          <Text style={styles.btnTxt}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}