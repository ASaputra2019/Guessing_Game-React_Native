import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
  return (<TextInput
    style={{...styles.input, ...props.style}}
    {...props}
  />);
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10
  }
});

export default Input;