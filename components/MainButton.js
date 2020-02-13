import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Color from '../constants/color';


const MainButton = props => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21){
    ButtonComponent = TouchableNativeFeedback;
  }
  return <ButtonComponent 
    onPress={props.onPress}
    activeOpacity={0.6}
  >
    <View style={styles.button}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </View>
  </ButtonComponent>
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25
  },
  buttonText: {
    color: "white",
    fontFamily: 'open-sans',
    fontSize: 18
  }
});

export default MainButton;