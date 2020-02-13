import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import color from '../constants/color';


const Header = ({title}) => {
  return (<View style={{...styles.header, ...Platform.select({ ios: styles.iOS, android: styles.android })}}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>);
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: Platform.OS === 'ios' ? 0 : 26,
    alignItems: "center",
    justifyContent: "center"
  },
  iOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  android: {
    backgroundColor: color.primary
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? color.primary : 'white',
    fontSize: 18,
  }
})

export default Header;