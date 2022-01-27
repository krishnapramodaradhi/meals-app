import { FlatList, StyleSheet, View } from 'react-native';
import MealItem from './MealItem';

const MealList = (props) => {
  const renderMealItem = (item) => {
    return (
      <MealItem
        title={item.title}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        image={item.imageUrl}
        onSelect={() =>
          props.navigation.navigate('MealDetail', {
            mealId: item.id,
          })
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.mealsByCategory}
        renderItem={({ item }) => renderMealItem(item)}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MealList;
