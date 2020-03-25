import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function Detail({ route, navigation }) {
  const { movie } = route.params;

  return (
    <View>
      <Text>{movie.title}!</Text>
      <FontAwesomeIcon icon={["fas","star"]} />
      <Text>{movie.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
