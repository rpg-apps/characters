import React from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native'

import { getAll } from '../../data/character_list'

import { Container, Header, Content, Button, Icon, Text } from 'native-base';

const styles = StyleSheet.create({
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '1rem'
  },
  centerButton: {
  	alignSelf: 'center',
  	backgroundColor: '#00ff00'
  },
  character: {
  	backgroundColor: '#00e0ff',
  	width: '100%',
  	height: '3rem',
  	marginBottom: '1rem',
  	padding: '1rem'
  },
  characterList: {
  	width: '100%'
  }
})

export default class Characters extends React.Component {
	constructor () {
		super()
		this.state = { characters: [
			{name: 'Ver'},
			{name: 'Melorf'},
			{name: 'Corie'}
		] }
	}

	async componentDidMount () {
		// const characters = await getAll()
		// this.setState({ characters })
	}

	render () {
		console.log(this.state.characters)
		return <View style={styles.page}>
		   <FlatList style={styles.characterList}
        		data={this.state.characters}
        		renderItem={({item}) => <View style={styles.character}>
        			<Text>
        			{item.name}
        			</Text>
        			</View>}
        		keyExtractor={item => item.name}
      		/>
          <Button iconLeft light style={styles.centerButton}>
            <Icon name='plus' type='AntDesign' />
            <Text>New Character</Text>
          </Button>
		</View>
	}
}