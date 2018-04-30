import { AsyncStorage } from 'react-native';

// Get decks
let get_decks = async () => {
    try {
        const decks = await AsyncStorage.getAllKeys();
        if (decks.length > 0) {

            const des = await AsyncStorage.multiGet(decks);

            let de = des.map((item)=>{
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

// Save new deck
let new_deck = async (title) => {
    try {
        await AsyncStorage.mergeItem(title, JSON.stringify({key: title, card_count: 0}));

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

// Get deck
let get_deck = async (title) => {
    try {
        await AsyncStorage.setItem(title, JSON.stringify({key: title, card_count: 0}));
        console.log("Inserted");
        
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

export { get_decks, new_deck };