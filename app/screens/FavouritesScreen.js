import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import TextBold from '../components/common/TextBold';
import MealList from '../components/MealList';

const FavouritesScreen = ({ navigation }) => {
  const favMeals = useSelector((state) => state.meals.favMeals);
  if (!favMeals.length) {
    return (
      <View style={styles.container}>
        <TextBold>No Favourites here. You can definetely add some.❤️</TextBold>
      </View>
    );
  }

  return <MealList mealsByCategory={favMeals} navigation={navigation} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FavouritesScreen;
