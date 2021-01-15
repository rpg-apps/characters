import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Characters from './components/pages/characters'

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#3e3e3e',
    height: '100vh'
  }
})

export default function App() {
  return <View style={styles.main}>
    <Characters />
  </View>
}