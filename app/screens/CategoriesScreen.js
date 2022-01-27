import { StyleSheet, FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import colors from '../constants/colors';

import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = ({ navigation }) => {
  const renderGridItem = (item) => {
    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onSelect={() =>
          navigation.navigate('MealsByCategory', { categoryId: item.id })
        }
      />
    );
  };
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={({ item }) => renderGridItem(item)}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    color: colors.primary,
  },
});

export default CategoriesScreen;
