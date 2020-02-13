import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import color from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import CustomText from '../components/BodyText';
import MainButton from '../components/MainButton';

const StartGame = ({ onStartGame }) => {
  const [enteredVal, setEnteredVal] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  const numberInputHandler = (inputText) => {
    setEnteredVal(inputText.replace(/[^0-9]/g, ''));
  };

  const resetHandler = () => {
    setEnteredVal('');
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
  
    Dimensions.addEventListener('change', updateLayout);
    return (() => {
      Dimensions.removeEventListener('change', updateLayout)
    });
  });
  
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredVal);
    if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number has to be a number between 1 to 99', [{ text: 'Okay', style: 'destructive', onPress: resetHandler }])
      return;
    }
    setConfirmed(true);
    setEnteredVal('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  let confirmedOutPut;
  if (confirmed) {
    confirmedOutPut = <Card style={styles.summary}>
      <Text>You selected </Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      <MainButton
        onPress={() => onStartGame(selectedNumber)}
      >START GAME</MainButton>
    </Card>
  }

  return (<ScrollView>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View style={styles.screen}>
          <CustomText style={styles.title}>Start a New Game</CustomText>
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
              <View style={{width: buttonWidth}}><Button
                color={color.accent}
                title="Reset"
                onPress={resetHandler} /></View>
              <View style={{width: buttonWidth}}><Button
                color={color.primary}
                title="Confirm"
                onPress={confirmInputHandler} /></View>
            </View>
          </Card>
          {confirmedOutPut}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </ScrollView>);
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
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
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