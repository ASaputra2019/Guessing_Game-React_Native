import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import BodyText from '../components/BodyText';
import GameControl from './GameControl';


const renderListItem = (listLength, itemData) => {
  return (<View style={styles.listItems}>
    <BodyText>{listLength - itemData.index}.  </BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>);
};

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let guess = Math.floor(Math.random() * (max - min - 1)) + min + 1;
  if (guess === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return guess;
  }
};

const GameScreen = (props) => {
  const intitalGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(intitalGuess);
  const [pastGuesses, setPastGuesses] = useState([String(intitalGuess)]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
  const currLow = useRef(0);
  const currHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, onGameOver, userChoice])

  const nextGuessHandler = dir => {
    if (dir === "lower" && currentGuess < userChoice || dir === "higher" && currentGuess > userChoice) {
      Alert.alert('Don\'t lie!', 'You provided wrong hint', [{ text: "Sorry", style: "cancel" }]);
      return;
    }
    if (dir === "lower") {
      currHigh.current = currentGuess;
    } else {
      currLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currLow.current, currHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPastGuesses(currPastGuesses => [String(nextNumber), ...currPastGuesses]);
  };

  useEffect(() => {
    const changeLayout = () => {
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height);

    };
    Dimensions.addEventListener('change', changeLayout);
    return () => { Dimensions.addEventListener('change', changeLayout) };
  });

  return (<View style={styles.screen}>
    <Text>The computer guesses</Text>
    <GameControl 
      deviceWidth={deviceWidth} 
      deviceHeight={deviceHeight} 
      nextGuessHandler={nextGuessHandler} 
      currentGuess={currentGuess} 
    />
    <View style={styles.scrollViewContainer}>
      <FlatList
        keyExtractor={item => item}
        data={pastGuesses}
        renderItem={renderListItem.bind(this, pastGuesses.length)}
        contentContainerStyle={styles.flatList}
      />
    </View>
  </View>);
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  listItems: {
    borderColor: "darkgray",
    borderWidth: 1,
    flexDirection: "row",
    padding: 15,
    marginTop: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    width: "100%"
  },
  scrollViewContainer: {
    width: "60%",
    flex: 1,
  },
  flatList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  }
});

export default GameScreen;