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

export default function Favoritos() {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({ favorites: [], participations: [] });

  const user = auth.currentUser;

  // Carrega eventos
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

  // Carrega dados do utilizador
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

  // Toggle favoritos
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

  // Toggle participação
  const toggleParticipation = async (eventId) => {
    const userRef = database.collection('users').doc(user.uid);
    const eventRef = database.collection('events').doc(eventId);

    const isParticipating = userData.participations.includes(eventId);

    try {
      const updatedUser = isParticipating
        ? userData.participations.filter((id) => id !== eventId)
        : [...userData.participations, eventId];
      await userRef.update({ participations: updatedUser });

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

  // Só mostrar eventos favoritos
  const favoriteEvents = events.filter((event) =>
    userData.favorites.includes(event.id)
  );

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
              name={isFavorite ? 'star' : 'star-o'}
              size={18}
              color={isFavorite ? 'gold' : 'gray'}
            />
            <Text style={styles.btnText}>
              {isFavorite ? 'Favorito' : 'Favorito'}
            </Text>
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
              {isParticipating ? 'Vou!' : 'Quero ir'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ paddingTop: 50, paddingHorizontal: 15 }}>
      <Text style={styles.header}>Eventos Favoritos</Text>
      <FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhum evento favorito ainda.
          </Text>
        }
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
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    marginLeft: 8,
  },
});
