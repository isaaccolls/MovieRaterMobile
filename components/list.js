import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

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
    <View style={styles.container}>
      <Text>This will be a list!</Text>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <Text key={item.id}>{item.title}</Text>
        )}
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
});
