import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Card, Button } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { get_decks, new_deck, clear_all, setLocalNotification } from './storage.js';

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Udacicards',
  };

  constructor(props) {

    super(props);
    this.state = { 
      decks: [],
      fadeAnim: new Animated.Value(1)};
    this.getDecks = () => {
      get_decks().then((items) => this.setState({ decks: items }));
    }
    //clear_all();
  }

  componentDidMount() {
    this.getDecks();
    setLocalNotification();
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <FlatList
          style={{ flex: 1 }}
          data={this.state.decks}
          ListHeaderComponent={<Text style={styles.listTitle}>Decks</Text>}
          ListEmptyComponent={<Text style={styles.empty}>You don't have decks yet, let's add some!</Text>}
          renderItem={({ item }) =>
            (
              <Animated.View 
              style={{opacity: this.state.fadeAnim}}>
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(
                    this.state.fadeAnim,
                    {
                      toValue: 0,
                      duration: 600,
                    }
                  ).start(()=>{
                    Animated.timing(
                      this.state.fadeAnim,
                      {
                        toValue: 1,
                        duration: 600,
                      }
                    ).start(()=>{
                      navigate('Deck', { item: item, update: this.getDecks });
                    });
                  });   
                }}>

                <Card title={item.key}>
                  <Text>{item.questions.length} cards</Text>
                </Card>
              </TouchableOpacity>
              </Animated.View>
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
  },
  empty: {
    padding: 20,
    fontSize: 10,
    color: '#545454'
  }
});
