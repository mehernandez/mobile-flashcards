import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { get_decks, new_deck, clear_all } from './storage.js';

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Decks',
  };

  constructor(props) {

    super(props);
    this.state = { decks: [] };
    this.getDecks = () => {
      get_decks().then((items) => this.setState({ decks: items }));
    }
    //clear_all();
  }

  componentDidMount() {
    this.getDecks()
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <FlatList
          style={{ flex: 1 }}
          data={this.state.decks}
          ListHeaderComponent={<Text style={styles.listTitle}>Decks</Text>}
          ListEmptyComponent={<Text>No decks yet</Text>}
          renderItem={({ item }) =>
            (
              <TouchableOpacity
                onPress={() => navigate('Deck', { item: item, update: this.getDecks })}>
                <Card title={item.key}>
                  <Text>{item.questions.length} cards</Text>
                </Card>
              </TouchableOpacity>
            )}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => navigate('NewDeck', { update: this.getDecks })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  listTitle: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#545454'
  }
});
