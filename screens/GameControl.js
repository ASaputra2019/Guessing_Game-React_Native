import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton';
import NumberContainter from '../components/NumberContainer';
import Card from '../components/Card';


const GameControl = ({ deviceWidth, deviceHeight, nextGuessHandler, currentGuess }) => {
  return (deviceWidth > deviceHeight) ?
    <View style={styles.buttonContainer2}>
      <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
        <Ionicons name="md-remove" size={24} color="white" />
      </MainButton>
      <NumberContainter>{currentGuess}</NumberContainter>
      <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
        <Ionicons name="md-add" size={24} color="white" />
      </MainButton>
    </View> :
    <View>
      <View style={styles.numContainer}><NumberContainter >{currentGuess}</NumberContainter></View>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
    </View>;
};

const styles = StyleSheet.create({
  numContainer: {
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "80%",
  },
  buttonContainer2: {
    flexDirection: 'row',
    width: "60%",
    justifyContent: 'space-between',
    alignItems: 'center'
  },

});

export default GameControl;