import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
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

  useEffect(() => {
    getData();
  }, []);

  const auth = () => {
    fetch('http://192.168.1.81:8000/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
    .then(res => res.json())
    .then(res => {
      console.log("auth res:", JSON.stringify(res));
      saveData(res.token);
      navigation.navigate('MovieList');
    })
    .catch(error => console.error(error));
  };

  const saveData = async token => {
    await AsyncStorage.setItem('MR_Token', token);
  };

  const getData = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    if (token) {
      navigation.navigate('MovieList');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        value={username}
        autoCapitalize={'none'}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        autoCapitalize={'none'}
        secureTextEntry={true}
      />
      <Button onPress={() => auth()} title={"Login"} />
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
