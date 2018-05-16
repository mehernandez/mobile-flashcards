import { StackNavigator } from 'react-navigation';
import Decks from './Decks.js';
import NewDeck from './NewDeck.js';
import NewCard from './NewCard.js';
import Deck from './Deck.js';
import Quiz from './Quiz.js';

const App = StackNavigator({
  Decks: { screen: Decks },
  NewDeck: { screen: NewDeck },
  Deck: { screen: Deck },
  NewCard: { screen: NewCard },
  Quiz: { screen: Quiz }
});

export default App;   