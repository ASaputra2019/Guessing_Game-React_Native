import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import color from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGame = ({onStartGame}) => {
  const [enteredVal, setEnteredVal] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState()

  const numberInputHandler = (inputText) => {
    setEnteredVal(inputText.replace(/[^0-9]/g, ''));
  };
  const resetHandler = () => {
    setEnteredVal('');
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredVal);
    if(isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 to 99', [{ text: 'Okay', style: 'destructive', onPress: resetHandler }])
      return;
    }
    setConfirmed(true);
    setEnteredVal('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  let confirmedOutPut;
  if(confirmed) {
    confirmedOutPut = <Card style={styles.summary}>
      <Text>You selected </Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <Button title="START GAME" onPress={() => {onStartGame(selectedNumber)}} />
    </Card>
  }

  return (<TouchableWithoutFeedback onPress={() => {
    Keyboard.dismiss();
  }}>
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game</Text>
      <Card style={styles.inputContainer} >
        <Text>Select a Number</Text>
        <Input style={styles.input}
          blurOnSubmit
          placeholder='1-99'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='number-pad'
          maxLength={2}
          onChangeText={numberInputHandler}
          value={enteredVal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}><Button 
            color={color.accent} 
            title="Reset" 
            onPress={resetHandler} /></View>
          <View style={styles.button}><Button 
            color={color.primary} 
            title="Confirm" 
            onPress={confirmInputHandler} /></View>
        </View>
      </Card>
      {confirmedOutPut}
    </View>
  </TouchableWithoutFeedback>);
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: "45%"
  },
  input: {
    width: 50,
    textAlign: 'center',
    marginVertical: 10
  },
  summary: {
    width: "auto",
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGame;