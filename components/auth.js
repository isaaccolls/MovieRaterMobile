import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Auth({ route, navigation }) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  navigation.setOptions({
    title: "Login",
    headerStyle: {
      backgroundColor: 'orange',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

  const auth = () => {
    // fetch(`http://192.168.1.81:8000/api/movies/${movie.id}/`, {
    //   method: 'PUT',
    //   headers: {
    //     'Authorization': `Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({title, description}),
    // })
    // .then(res => res.json())
    // .then(movie => {
    //   console.log("movie edited res:", JSON.stringify(movie));
    //   navigation.navigate("Detail", {movie: movie});
    // })
    // .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button onPress={() => autn()} title={"Login"} />
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
