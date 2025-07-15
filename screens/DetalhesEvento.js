import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DetalhesEvento({ route, navigation }) {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>📍 {event.location}</Text>
      <Text style={styles.info}>🕒 {event.datetime}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnTxt}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: '100%', height: 200, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  info: { fontSize: 14, color: 'gray', marginBottom: 5 },
  description: { fontSize: 16, marginVertical: 10 },
  btn: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  btnTxt: { color: 'white', fontSize: 16 },
});
