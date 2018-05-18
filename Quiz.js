import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {clearLocalNotification, setLocalNotification} from './storage.js'

export default class Quiz extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return { title: 'Quiz' };
  }

  constructor(props) {

    super(props);

    const { state } = this.props.navigation;
    this.state = { questions: state.params.questions, text: state.params.questions[0].question, question: true, number: 0, right: 0 };
  }

  render() {

    const { state, goBack } = this.props.navigation;

    let it = this.state.questions[this.state.number];

    let Correctness = (props) => {
      return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => this.setState({ number: this.state.number + 1, right: this.state.right + 1 })}
          >
            <Text style={styles.buttonText}>
              Correct
        </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => this.setState({ number: this.state.number + 1 })}
          >
            <Text style={styles.buttonText}>
              Incorrect
          </Text>
          </TouchableOpacity>
        </View>
      )
    }

    let Option = (props) => {
      if (this.state.question) {
        return (
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text
              style={styles.textTitle}>
              {it.question}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ question: false })}
            >
              <Text style={{ color: 'red', textAlign: 'center', fontSize: 20 }}>
                Answer
            </Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text
              style={styles.textTitle}>
              {it.answer}
            </Text>
            <TouchableOpacity
              title='Question'
              onPress={() => this.setState({ question: true })}
              containerStyle={styles.button}
            >
              <Text style={{ color: 'red', textAlign: 'center', fontSize: 20 }}>
                Question
            </Text>
            </TouchableOpacity>
          </View>
        )
      }
    }

    let Full = (props) => {
      if (this.state.number == this.state.questions.length) {
        clearLocalNotification().then(setLocalNotification);
        return (
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text
              style={styles.textTitle}>
              You got {this.state.right} of {this.state.questions.length} answers right!
          </Text>
            <View style={{ justifyContent: 'space-around' , flex: 0.4}}>
              <TouchableOpacity
                style={styles.button1}
                title='Restart quiz'
                onPress={() => this.setState({ question: true, number: 0, right: 0 })}
              >
                <Text style={styles.buttonText}>
                  Restart quiz
          </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => goBack()}
              >
                <Text style={styles.buttonText}>
                  Back to deck
            </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text style={{ flex: 0.5, fontWeight: 'bold', padding: 10 }}>
              {this.state.number}/{this.state.questions.length}
            </Text>
            <Option />
            <Correctness />
          </View>);
      }
    }

    return (
      <View style={styles.container}>

        <Full />

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
  textTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button1: {
    height: 60,
    borderRadius: 50,
    margin: 20,
    backgroundColor: '#4c4cff'
  },
  button2: {
    height: 60,
    borderRadius: 50,
    margin: 20,
    backgroundColor: '#ff4c4c'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20
  }
});
