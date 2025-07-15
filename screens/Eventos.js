import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { database, auth } from '../services/firebaseConfig';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function Eventos({ navigation }) {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({
    favorites: [],
    participations: [],
  });

  const user = auth.currentUser;

  // Carrega eventos da coleção "events"
  useEffect(() => {
    const unsubscribe = database.collection('events').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    });

    return unsubscribe;
  }, []);

  // Carrega dados do utilizador (favoritos e participações)
  useEffect(() => {
    if (!user) return;

    const unsubscribe = database
      .collection('users')
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setUserData({
            favorites: doc.data().favorites || [],
            participations: doc.data().participations || [],
          });
        }
      });

    return unsubscribe;
  }, []);

  // Adicionar ou remover favorito
  const toggleFavorite = async (eventId) => {
    const ref = database.collection('users').doc(user.uid);
    const isFav = userData.favorites.includes(eventId);
    const updated = isFav
      ? userData.favorites.filter((id) => id !== eventId)
      : [...userData.favorites, eventId];

    try {
      await ref.update({ favorites: updated });
    } catch (err) {
      Alert.alert('Erro', 'Erro ao atualizar favoritos.');
    }
  };

  // Adicionar ou remover participação
  const toggleParticipation = async (eventId) => {
    const userRef = database.collection('users').doc(user.uid);
    const eventRef = database.collection('events').doc(eventId);

    const isParticipating = userData.participations.includes(eventId);

    try {
      // Atualiza `users/{uid}`
      const updatedUser = isParticipating
        ? userData.participations.filter((id) => id !== eventId)
        : [...userData.participations, eventId];
      await userRef.update({ participations: updatedUser });

      // Atualiza `events/{id}.participants`
      const eventDoc = await eventRef.get();
      const currentParticipants = eventDoc.data().participants || [];

      const updatedParticipants = isParticipating
        ? currentParticipants.filter((uid) => uid !== user.uid)
        : [...currentParticipants, user.uid];

      await eventRef.update({ participants: updatedParticipants });
    } catch (err) {
      Alert.alert('Erro', 'Erro ao atualizar participação.');
    }
  };

  const renderEvent = ({ item }) => {
    const isFavorite = userData.favorites.includes(item.id);
    const isParticipating = userData.participations.includes(item.id);

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.info}>📍 {item.location}</Text>
        <Text style={styles.info}>🕒 {item.datetime}</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => toggleFavorite(item.id)}>
            <FontAwesome5
              name={isFavorite ? 'star' : 'star-half-alt'}
              size={18}
              color={isFavorite ? 'gold' : 'gray'}
            />
            <Text style={styles.btnText}>Favorito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => toggleParticipation(item.id)}>
            <MaterialIcons
              name={isParticipating ? 'event-available' : 'event-busy'}
              size={20}
              color={isParticipating ? 'limegreen' : 'red'}
            />
            <Text style={styles.btnText}>
              {isParticipating ? 'Vou!' : 'Não vou'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botão Ver Detalhes */}
        <TouchableOpacity
          style={[styles.actionBtn, styles.detailsBtn]}
          onPress={() =>
            navigation.navigate('DetalhesEvento', { event: item })
          }>
          <Text style={styles.btnText}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 15 }}>
      <Text style={styles.header}>Eventos Disponíveis</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  desc: {
    fontSize: 14,
    marginVertical: 5,
  },
  info: {
    fontSize: 12,
    color: 'gray',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailsBtn: {
    backgroundColor: 'dodgerblue',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
