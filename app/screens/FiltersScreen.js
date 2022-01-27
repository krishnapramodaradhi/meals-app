import { useCallback, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import TextRegular from '../components/common/TextRegular';
import TextBold from '../components/common/TextBold';
import colors from '../constants/colors';
import { setFilters } from '../store/actions/meals';

const Filters = ({ label, value, onChange }) => {
  return (
    <View style={styles.filters}>
      <TextRegular style={styles.label}>{label}</TextRegular>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary }}
      />
    </View>
  );
};

const FiltersScreen = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={saveFilters}>
          <Ionicons name='ios-save' color={colors.primary} size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, saveFilters]);
  return (
    <View style={styles.container}>
      <TextBold style={styles.title}>Available Filters / Restrictions</TextBold>
      <Filters
        label='Gluten-free'
        value={isGlutenFree}
        onChange={(val) => setIsGlutenFree(val)}
      />
      <Filters
        label='Lactose-free'
        value={isLactoseFree}
        onChange={(val) => setIsLactoseFree(val)}
      />
      <Filters
        label='Vegan'
        value={isVegan}
        onChange={(val) => setIsVegan(val)}
      />
      <Filters
        label='Vegetarian'
        value={isVegetarian}
        onChange={(val) => setIsVegetarian(val)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  filters: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
  },
});

export default FiltersScreen;
