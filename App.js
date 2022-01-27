import { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import { Ionicons } from '@expo/vector-icons';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import CategoriesScreen from './app/screens/CategoriesScreen';
import MealDetailScreen from './app/screens/MealDetailScreen';
import MealsByCategoryScreen from './app/screens/MealsByCategoryScreen';
import FavouritesScreen from './app/screens/FavouritesScreen';
import FiltersScreen from './app/screens/FiltersScreen';
import colors from './app/constants/colors';
import mealsReducer from './app/store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    urbanist: require('./app/assets/fonts/Urbanist-Regular.ttf'),
    'urbanist-bold': require('./app/assets/fonts/Urbanist-Bold.ttf'),
  });
};

const Stack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();
const FilterStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  if (!isAppReady) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsAppReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const MealsNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontFamily: 'urbanist-bold',
          },
          headerBackTitleStyle: {
            fontFamily: 'urbanist',
          },
        }}
      >
        <Stack.Screen
          name='Categories'
          component={CategoriesScreen}
          options={{
            title: 'Meal Categories',
          }}
        />
        <Stack.Screen name='MealDetail' component={MealDetailScreen} />
        <Stack.Screen
          name='MealsByCategory'
          component={MealsByCategoryScreen}
        />
      </Stack.Navigator>
    );
  };

  const FavNavigator = () => (
    <FavStack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontFamily: 'urbanist-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'urbanist',
        },
      }}
    >
      <FavStack.Screen name='Your Favourites' component={FavouritesScreen} />
      <FavStack.Screen name='MealDetail' component={MealDetailScreen} />
    </FavStack.Navigator>
  );

  const FilterNavigator = () => {
    return (
      <FilterStack.Navigator
        screenOptions={{
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontFamily: 'urbanist-bold',
          },
          headerBackTitleStyle: {
            fontFamily: 'urbanist',
          },
        }}
      >
        <FilterStack.Screen name='Meal Filters' component={FiltersScreen} />
      </FilterStack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontFamily: 'urbanist-bold',
              fontSize: 14,
            },
            headerShown: false,
            tabBarActiveTintColor: colors.accent,
          }}
        >
          <Tab.Screen
            name='Meals'
            component={MealsNavigator}
            options={{
              tabBarIcon: (tabInfo) => (
                <Ionicons
                  name='ios-restaurant'
                  color={tabInfo.color}
                  size={22}
                />
              ),
            }}
          />
          <Tab.Screen
            name='Fav'
            component={FavNavigator}
            options={{
              tabBarLabel: 'Favourites!',
              tabBarIcon: (tabInfo) => (
                <Ionicons name='ios-star' color={tabInfo.color} size={22} />
              ),
            }}
          />
          <Tab.Screen
            name='Filters'
            component={FilterNavigator}
            options={{
              tabBarIcon: (tabInfo) => (
                <Ionicons name='ios-filter' size={22} color={tabInfo.color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
