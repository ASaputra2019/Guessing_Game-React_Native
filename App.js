import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from './components/Header';
import StartGame from './screens/StartGame';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return <AppLoading 
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={err => console.log(err)}
    />;
  }

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
    <SafeAreaView style={styles.screen}>
      <Header 
        title="Guess a Number"
      />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
