import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Characters from './components/pages/characters'

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#3e3e3e'
  }
})

export default function App() {
  return <View style={styles.main}>
    <Characters />
  </View>
}