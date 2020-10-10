import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { getAll } from '../../data/character_list'

import Button from '../containers/button'

export default class Characters extends React.Component {
	constructor () {
		super()
		this.state = { characters: [] }
	}

	async componentDidMount () {
		const characters = await getAll()
		this.setState({ characters })
	}

	render () {
		return <View>
			<Button>
				<Text>+</Text>
			</Button>
		</View>
	}
}