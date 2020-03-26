import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Edit({ route, navigation }) {
  const { movie } = route.params;
  
  const [ title, setTitle ] = useState(movie.title);
  const [ description, setDescription ] = useState(movie.description);

  const saveMovie = () => {
    navigation.goBack();
  };

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
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChange={text => setTitle(text)}
        value={title}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChange={text => setDescription(text)}
        value={description}
      />
      <Button onPress={() => saveMovie()} title="Save" />
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
