import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { new_deck } from './storage.js';

export default class NewDeck extends React.Component {

  static navigationOptions = {
    title: 'New deck',
  };

  constructor(props) {

    super(props);
    this.state = { text: '' };
  }

  render() {

    const { state, goBack } = this.props.navigation;

    return (
      <View style={styles.container}>

        <TextInput
          placeholder='Write the new deck name here ...'
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={() => {
            if (this.state.text) {
              new_deck(this.state.text);
              state.params.update();
              goBack();
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Create deck
        </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  textInput: {
    height: 60,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#bfbfbf'
  },
  button: {
    height: 60,
    borderRadius: 50,
    margin: 20,
    backgroundColor: '#00cc00'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20
  }
});
