import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setRounds(0);
  };
  const gameOverHandler = (numbOfRounds) => {
    setRounds(numbOfRounds);
  };
  const newGameHandler = () => {
    setRounds(0);
    setUserNumber(null);
  }

  let content = (userNumber && rounds <= 0) ? 
    <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} /> :
  (rounds > 0) ? 
    <GameOver roundsNumber={rounds} userNumber={userNumber} newGameHandler={newGameHandler} /> : 
    <StartGame onStartGame={startGameHandler} />;

  return (
    <View style={styles.screen}>
      <Header 
        title="Guess a Number"
      />
      {content}
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
