import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import NumberContainter from '../components/NumberContainer';
import Card from '../components/Card';


const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let guess = Math.floor(Math.random() * (max - min)) + min;
  if (guess === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return guess;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);
  const currLow = useRef(0);
  const currHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);      
    }
  }, [currentGuess, onGameOver, userChoice])

  const nextGuessHandler = dir => {
    if(dir === "lower" && currentGuess < userChoice || dir === "higher" && currentGuess > userChoice) {
      Alert.alert('Don\'t lie!', 'You provided wrong hint', [{ text: "Sorry", style: "cancel" }]);
      return;
    }
    if(dir === "lower") {
      currHigh.current = currentGuess;
    } else {
      currLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(currLow.current, currHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(currentRounds =>  currentRounds + 1);
  }

  return (<View style={styles.screen}>
    <Text>The opponent guess</Text>
    <NumberContainter>{currentGuess}</NumberContainter>
    <Card style={styles.buttonContainer}>
      <Button title="Lower" onPress={nextGuessHandler.bind(this, "lower")} />
      <Button title="Higher" onPress={nextGuessHandler.bind(this, "higher")} />
    </Card>
  </View>);
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameScreen;