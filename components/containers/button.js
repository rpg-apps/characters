import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#00af00',
	    display: 'inline-block',
	    width: '3rem',
	    height: '3rem',
	    textAlign: 'center',
	    textAlignVertical: 'middle',
	    fontSize: '3rem',
	    lineHeight: '1rem',
	    padding: '0.9rem 0.8rem',
	    fontFamily: 'monospace',
	    borderRadius: '1.5rem',
	}
})

const Button = (props) => {
	return <View>
		<TouchableOpacity style={styles.button}>
			{props.children}
		</TouchableOpacity>
	</View>
}

export default Button