import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
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
          placeholder='Write name here ...'
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          style={styles.textInput}
        />
        <Button
          title='Create deck'
          onPress={() => {
            new_deck(this.state.text);
            goBack();
          }}
          containerStyle={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textInput: {
    height: 60,
    padding: 20,
    backgroundColor: 'gray'
  },
  button: {
    height: 60
  }
});
