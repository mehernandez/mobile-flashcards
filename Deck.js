import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
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

        <Text>
          {this.state.item.key}
        </Text>
        <Text
          style={styles.textTitle}>
          {this.state.item.questions.length} cards
          </Text>
        <Button
          title='Add card'
          onPress={() => navigate('NewCard', { item: this.state.item, update: this.getDeck })}
          containerStyle={styles.button}
        />
        <Button
          title='Start quiz'
          onPress={() => {
            if (this.state.item.questions.length > 0) {
              clearLocalNotification().then(setLocalNotification);

              navigate('Quiz', { questions: this.state.item.questions })
            } else {
              alert('This deck has no cards');
            }
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
  textTitle: {
    height: 60,
    padding: 20
  },
  button: {
    height: 60
  }
});
