import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


const GameOver = (props) => {
  return (<View style={styles.screen}>
    <Text>The Game is over</Text>
    <Text>Number of rounds: {props.roundsNumber}</Text>
    <Text>Your number was: {props.userNumber}</Text>
    <Button title="New Game" onPress={props.newGameHandler}/>
  </View>);
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default GameOver