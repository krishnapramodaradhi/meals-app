import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import TextBold from '../components/common/TextBold';

import MealList from '../components/MealList';
import { CATEGORIES } from '../data/dummy-data';

const MealsByCategoryScreen = ({ route, navigation }) => {
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const catId = route.params.categoryId;
  const mealsByCategory = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: CATEGORIES.find((cat) => cat.id === catId).title,
    });
  }, [navigation]);

  if (!mealsByCategory.length) {
    return (
      <View style={styles.container}>
        <TextBold>
          No Recipies. Might be a good idea to check your filters.
        </TextBold>
      </View>
    );
  }

  return <MealList mealsByCategory={mealsByCategory} navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MealsByCategoryScreen;
