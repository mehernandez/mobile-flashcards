import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

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
        <View>
          <Button
            title='Correct'
            onPress={() => this.setState({ number: this.state.number + 1, right: this.state.right + 1 })}
            containerStyle={styles.button}
          />
          <Button
            title='Incorrect'
            onPress={() => this.setState({ number: this.state.number + 1 })}
            containerStyle={styles.button}
          />
        </View>
      )
    }

    let Option = (props) => {
      if (this.state.question) {
        return (
          <View>
            <Text
              style={styles.textTitle}>
              {it.question}
            </Text>
            <Button
              title='Answer'
              onPress={() => this.setState({ question: false })}
              containerStyle={styles.button}
            />
          </View>
        )
      } else {
        return (
          <View>
            <Text
              style={styles.textTitle}>
              {it.answer}
            </Text>
            <Button
              title='Question'
              onPress={() => this.setState({ question: true })}
              containerStyle={styles.button}
            />
          </View>
        )
      }
    }

    let Full = (props) => {
      if (this.state.number == this.state.questions.length) {
        return (
          <View>
            <Text
              style={styles.textTitle}>
              You got {this.state.right} of {this.state.questions.lenght} right!
          </Text>
            <Button
              title='Finish'
              onPress={() => goBack()}
              containerStyle={styles.button}
            />
          </View>
        )
      } else {
        return <Option />
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
    height: 60,
    padding: 20
  },
  button: {
    height: 60
  }
});
