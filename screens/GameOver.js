import React from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, ScrollView } from 'react-native';
import CustomText from '../components/BodyText';
import color from '../constants/color';
import MainButton from '../components/MainButton';

const GameOver = (props) => {
  return (<ScrollView>
    <View style={styles.screen}>
      <Text style={styles.title}>The Game is over</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/onTarget.png')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <CustomText style={styles.conclusion}>The computer needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds {"\n"} to guess your number: <Text style={styles.highlight}>{props.userNumber}</Text>.</CustomText>
      <View style={styles.button}>
        <MainButton onPress={props.newGameHandler}>New Game</MainButton>
      </View>
    </View>
  </ScrollView>);
};

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 23,
    fontWeight: "bold"
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: Dimensions.get('window').width * 0.6,
    width: Dimensions.get('window').width * 0.6,
    marginVertical: Dimensions.get('window').height / 30,
    backgroundColor: "yellow",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: Dimensions.get('window').width * 0.6,
    width: Dimensions.get('window').width * 0.6,
  },
  conclusion: {
    width: "80%",
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
    textAlign: 'center',
    lineHeight: 27
  },
  button: {
    borderRadius: 10,
    marginVertical: 20,
    overflow: "hidden",
  },
  highlight: {
    color: color.primary,
    fontSize: 25,
    fontWeight: 'bold'
  }
});

export default GameOver