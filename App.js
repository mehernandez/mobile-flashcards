import { StackNavigator } from 'react-navigation';
import Decks from './Decks.js';
import NewDeck from './NewDeck.js';

const App = StackNavigator({
  Decks: { screen: Decks },
  NewDeck: { screen: NewDeck},
});

export default App;   