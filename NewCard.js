import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
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
       <View style={{flex: 1, justifyContent: 'space-around'}}>
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
        </View>
        <View style={{flex:1, justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if(this.state.question && this.state.answer){
            let quest = this.state.item.questions;
            quest.push({ question: this.state.question, answer: this.state.answer });
            new_card(this.state.item.key, quest);
            state.params.update();
            goBack();
            }
          }}
        >
          <Text style={styles.buttonText}>
          Create card
          </Text>
        </TouchableOpacity>
</View>
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
