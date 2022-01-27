import { useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import TextRegular from '../components/common/TextRegular';
import TextBold from '../components/common/TextBold';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../store/actions/meals';

const MealDetailList = ({ data, mealProp }) => {
  return (
    <View style={styles.mealListContainer}>
      <TextBold style={styles.title}>{mealProp.toUpperCase()}</TextBold>
      {data[mealProp].map((d, i) => (
        <View key={d} style={styles.listItem}>
          {mealProp === 'ingredients' ? (
            <View style={styles.index}>
              <TextBold>{i + 1}.</TextBold>
              <TextBold style={styles.item}>{d}</TextBold>
            </View>
          ) : (
            <View style={styles.index}>
              <TextRegular>{i + 1}.</TextRegular>
              <TextRegular style={styles.item}>{d}</TextRegular>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const MealDetailScreen = ({ route, navigation }) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const dispatch = useDispatch();
  const mealId = route.params.mealId;
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const currentFavMeal = useSelector((state) =>
    state.meals.favMeals.some((meal) => meal.id === mealId)
  );

  const dispatchFavHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.6} onPress={dispatchFavHandler}>
          <Ionicons
            name={currentFavMeal ? 'ios-star' : 'ios-star-outline'}
            color={colors.primary}
            size={22}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, currentFavMeal]);
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <TextRegular>{selectedMeal.duration}m</TextRegular>
        <TextRegular>{selectedMeal.complexity.toUpperCase()}</TextRegular>
        <TextRegular>{selectedMeal.affordability.toUpperCase()}</TextRegular>
      </View>
      <MealDetailList data={selectedMeal} mealProp='ingredients' />
      <MealDetailList data={selectedMeal} mealProp='steps' />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('screen').height / 4,
  },
  details: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  mealListContainer: {
    marginVertical: 10,
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  index: {
    flexDirection: 'row',
  },
  item: {
    marginLeft: 5,
  },
});

export default MealDetailScreen;
