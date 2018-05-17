import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'Udacicards:notifications';

// Get decks
let get_decks = async () => {
    try {
        let decks = await AsyncStorage.getAllKeys();
        decks = decks.filter((item)=>{
            if (item === 'Udacicards:notifications'){
                return false;
            }else{
                return true;
            }
        })

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

// Notification functions 

// Clear notifications
function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
}

// Create a new notification
function createNotification(){
    return {
        title: 'You need to practice',
        body: "We don't have records of you practicing since yesterday",
        ios: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

// Set a new notification
function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data) => {
        if (data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                if(status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync();

                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(8);
                    tomorrow.setMinutes(0);

                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day'
                        }
                    )

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));

                }
            })
        }
    })
}


export { get_decks, new_deck, new_card, clear_all, get_deck, clearLocalNotification, setLocalNotification };