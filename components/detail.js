import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Detail({ route, navigation }) {
  const { movie } = route.params;

  return (
    <View>
      <Text>{movie.title}</Text>
      <View style={styles.starContainer}>
        <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={["fas","star"]} />
        <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={["fas","star"]} />
        <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={["fas","star"]} />
        <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={["fas","star"]} />
        <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={["fas","star"]} />
        <Text>({movie.no_of_ratings})</Text>
      </View>
      <Text>{movie.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  starContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  orange: {
    color: "orange",
  },
  white: {
    color: "white",
  },
});
