import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function MovieList() {

  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.81:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': `Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220`,
      },
    })
    .then(res => res.json())
    .then(jsonRes => setMovies(jsonRes))
    .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <Image
        source={require('../assets/MR_logo.png')}
        style={styles.lgo}
        resizeMode="contain"
      />
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  logo: {
    width: '100%',
    height: 135,
    paddingTop: 30,
  },
});
