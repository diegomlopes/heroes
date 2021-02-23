/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import ListHero from './presentation/features/heroes/components/list';
import DetailsHero from './presentation/features/heroes/components/details';
import store from './presentation/features/heroes/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import { shareList } from './presentation/features/heroes/redux/store';
import { Share } from 'react-native';

// Create the navigation stack of the app.
const Stack = createStackNavigator();

// Create the main stateless component.
const App = () => {
  return (
    // Provider a store to redux.
    <Provider store={store}>
      {/*  Create the navigation container  */}
      <NavigationContainer>
        {/* Create the stack of navigation */}
        <Stack.Navigator>
          {/* Create the list screen */}
          <Stack.Screen
            name="Heroes"
            component={ListHero}
            options={{
              headerRight: () => (
                <Button onPress={this.onSharePress} >
                  SHARE LIST
                </Button>
              ),
            }}
          />
          {/* Create the detail screen */}
          <Stack.Screen
            name="Details"
            component={DetailsHero}
            options={{
              headerRight: () => (
                <Button onPress={this.onSharePress} >
                  SHARE LIST
                </Button>
              ),
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// Triggers the function of sharing the user's favorite list. 
onSharePress = async () => {
  // Get the favorite list from store.
  const favoriteList = await shareList();

  // Info sended to the share screen, including the list.
  var shareOptions = {
    title: 'Favorite List',
    message: 'favoriteList',
  };

  // Update the message with list of favorites.
  shareOptions.message = "My favorite list of marvel heroes\n" + favoriteList.toString();

  //Open dialog to share the list.
  Share.share(shareOptions);
};

//export the App as a default export 
export default App;
