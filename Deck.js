import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { get_deck, clearLocalNotification, setLocalNotification } from './storage.js';

export default class Deck extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.item.key };
  }

  constructor(props) {

    super(props);

    const { state } = this.props.navigation;
    this.state = { item: state.params.item, question: '', answer: '' };
    this.getDeck = () => {
      get_deck(this.state.item.key).then((item) => this.setState({ item: item }));
    }
  }

  componentWillUnmount() {
    this.props.navigation.state.params.update();
  }


  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'center' }}>
          <Text style={styles.textTitle}>
            {this.state.item.key}
          </Text>
          <Text
            style={styles.textCards}>
            {this.state.item.questions.length} cards
          </Text>
        </View>
        <View style={{ justifyContent: 'space-around', flex: 1 }}>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => navigate('NewCard', { item: this.state.item, update: this.getDeck })}
          >
            <Text style={styles.buttonText}>
              Add card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              if (this.state.item.questions.length > 0) {
                clearLocalNotification().then(setLocalNotification);

                navigate('Quiz', { questions: this.state.item.questions })
              } else {
                alert('This deck has no cards');
              }
            }}
          >
            <Text style={styles.buttonText}>
              Start quiz
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
  textTitle: {
    fontWeight: 'bold',
    fontSize: 35,
    padding: 5,
    textAlign: 'center'
  },
  textCards: {
    fontSize: 20,
    padding: 5,
    textAlign: 'center'
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
