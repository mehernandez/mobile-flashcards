import { AsyncStorage } from 'react-native';

// Get decks
let get_decks = async () => {
    try {
        const decks = await AsyncStorage.getAllKeys();
        if (decks.length > 0) {

            const des = await AsyncStorage.multiGet(decks);

            let de = des.map((item) => {
                return JSON.parse(item[1]);
            });

            return de;

        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }

}

// Create new deck
let new_deck = async (title) => {
    try {
        await AsyncStorage.mergeItem(title, JSON.stringify({ key: title, questions: [] }));

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

// Get deck
let get_deck = async (title) => {
    console.log("Getting deck");
    try {
        const des = await AsyncStorage.getItem(title);
        return JSON.parse(des);
    } catch (error) {
        console.log(error);
        return { key: title, questions: [] };
    }

}

// Create new card
let new_card = async (key, questions) => {
    try {
        await AsyncStorage.mergeItem(key, JSON.stringify({ questions }));

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

// Clear all data
let clear_all = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { get_decks, new_deck, new_card, clear_all, get_deck };