import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Edit({ route, navigation }) {
  const { movie } = route.params;
  
  const [ title, setTitle ] = useState(movie.title);
  const [ description, setDescription ] = useState(movie.description);

  navigation.setOptions({
    title: movie.title,
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    headerRight: () => (
      <Button
        title="Remove"
        color="#fff"
        onPress={() => removeClicled(movie)}
      />
    ),
  });

  const saveMovie = () => {
    if (movie.id) {
      fetch(`http://192.168.1.81:8000/api/movies/${movie.id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description}),
      })
      .then(res => res.json())
      .then(movie => {
        console.log("movie edited res:", JSON.stringify(movie));
        navigation.navigate("Detail", {movie: movie});
      })
      .catch(error => console.error(error));
    } else {
      fetch('http://192.168.1.81:8000/api/movies/', {
        method: 'POST',
        headers: {
          'Authorization': `Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description}),
      })
      .then(res => res.json())
      .then(movie => {
        console.log("movie edited res:", JSON.stringify(movie));
        navigation.navigate("MovieList");
      })
      .catch(error => console.error(error));
    }
  };

  const removeClicled = movie => {
    // console.log(movie);
    fetch(`http://192.168.1.81:8000/api/movies/${movie.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        navigation.navigate("MovieList");
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={text => setTitle(text)}
        value={title}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={text => setDescription(text)}
        value={description}
      />
      <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Save"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c35',
    padding: 10,
  },
  label: {
    fontSize: 24,
    color: '#fff',
    padding: 10,
  },
  input: {
    fontSize: 20,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  },
});
