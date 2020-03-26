import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, AsyncStorage, TouchableOpacity } from 'react-native';

export default function MovieList({ navigation }) {
  const [ movies, setMovies ] = useState([]);
  let token = null;

  navigation.setOptions({
    title: "List of movies",
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
        title="Add new"
        color="#fff"
        onPress={() => navigation.navigate("Edit", {movie: {title: '', description: ''}})}
      />
    ),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    token = await AsyncStorage.getItem('MR_Token');
    if (token) {
      getMovies();
    } else {
      navigation.navigate('Auth');
    }
  };

  const getMovies = () => {
    fetch('http://192.168.1.81:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    .then(res => res.json())
    .then(jsonRes => setMovies(jsonRes))
    .catch(error => console.error(error));
  };

  let movieclicked = movie => {
    // console.log("movieclicked token:", token);// 🙃
    navigation.navigate("Detail", {movie});
  };

  return (
    <View>
      <Image
        source={require('../assets/MR_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => movieclicked(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: '#282c35',
  },
  itemText: {
    color: '#fff',
    fontSize: 24,
  },
  logo: {
    width: '100%',
    height: 135,
    paddingTop: 30,
  },
});
