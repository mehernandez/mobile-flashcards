import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { new_card } from './storage.js';

export default class NewCard extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return { title: 'New card' };
  }

  constructor(props) {

    super(props);

    const { state } = this.props.navigation;
    this.state = { item: state.params.item, question: '', answer: '' };
  }

  render() {

    const { state, goBack } = this.props.navigation;

    return (
      <View style={styles.container}>

        <TextInput
          placeholder='Question'
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          style={styles.textInput}
        />
        <TextInput
          placeholder='Answer'
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.text}
          style={styles.textInput}
        />
        <Button
          title='Create card'
          onPress={() => {
            let quest = this.state.item.questions;
            quest.push({ question: this.state.question, answer: this.state.answer });
            new_card(this.state.item.key, quest);
            state.params.update();
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
