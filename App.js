import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Header, Card, Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { get_decks, new_deck } from './storage.js';

export default class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = { decks: [] };
  }

  componentDidMount() {
    get_decks().then((items) => this.setState({ decks: items }));
  }

  render() {

    let decks = [{ name: 'SAP', card_count: 10, key: '0' }, { name: 'Python', card_count: 3, key: '1' }, { name: 'SAP', card_count: 10, key: '2' }, { name: 'Python', card_count: 3, key: '3' }, { name: 'SAP', card_count: 10, key: '4' }, { name: 'Python', card_count: 3, key: '5' }];

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Udacicards', style: styles.header }}
        />
        <FlatList
          style={{ flex: 1 }}
          data={this.state.decks}
          ListHeaderComponent={<Text style={styles.listTitle}>Decks</Text>}
          ListEmptyComponent={<Text>No decks yet</Text>}
          renderItem={({ item }) =>
            (
              <TouchableOpacity
                onPress={() => get_decks()}>
                <Card title={item.key}>
                  <Text>{item.card_count} cards</Text>
                </Card>
              </TouchableOpacity>
            )}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => { new_deck("hi") }}
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
  header: {
    fontSize: 25,
    color: '#fff',
    paddingTop: 15
  },
  listTitle: {
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#545454'
  }
});
