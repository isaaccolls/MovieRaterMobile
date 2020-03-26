import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Detail({ route, navigation }) {
  const { movie } = route.params;

  const [ highlight, setHighLight ] = useState(0);

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
        title="Edit"
        color="#fff"
        onPress={() => navigation.navigate("Edit", {movie: movie})}
      />
    ),
  });

  const rateClicked = () => {
    if (highlight > 0 && highlight < 6) {
      fetch(`http://192.168.1.81:8000/api/movies/${movie.id}/rate_movie/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token 8c667c2fa7048eb4d07aeca5e650b3757ce29220`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({stars: highlight}),
      })
      .then(res => res.json())
      .then(res => {
        // console.log("rate edited res:", JSON.stringify(res));
        setHighLight(0);
        Alert.alert("Rating",res.message);
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Error", error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={["fas","star"]} />
        <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={["fas","star"]} />
        <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={["fas","star"]} />
        <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={["fas","star"]} />
        <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={["fas","star"]} />
        <Text style={styles.white}>({movie.no_of_ratings})</Text>
      </View>
      <Text style={styles.description}>{movie.description}</Text>
      <View style={{borderBottomColor: '#fff', borderBottomWidth: 2}} />
      <Text style={styles.description}>Rate it..!!</Text>
      <View style={styles.starContainer}>
        <FontAwesomeIcon style={highlight > 0 ? styles.purple : styles.grey} icon={["fas","star"]} size={48} onPress={() => setHighLight(1)} />
        <FontAwesomeIcon style={highlight > 1 ? styles.purple : styles.grey} icon={["fas","star"]} size={48} onPress={() => setHighLight(2)} />
        <FontAwesomeIcon style={highlight > 2 ? styles.purple : styles.grey} icon={["fas","star"]} size={48} onPress={() => setHighLight(3)} />
        <FontAwesomeIcon style={highlight > 3 ? styles.purple : styles.grey} icon={["fas","star"]} size={48} onPress={() => setHighLight(4)} />
        <FontAwesomeIcon style={highlight > 4 ? styles.purple : styles.grey} icon={["fas","star"]} size={48} onPress={() => setHighLight(5)} />
      </View>
      <Button title="Rate" onPress={() => rateClicked()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c35',
    padding: 10,
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orange: {
    color: 'orange',
  },
  white: {
    color: '#fff',
  },
  description: {
    fontSize: 20,
    color: '#fff'
  },
  purple: {
    color: 'purple',
  },
  grey: {
    color: '#ccc',
  },
});
