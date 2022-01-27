import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '../constants/colors';
import TextBold from '../components/common/TextBold';

const CategoryGridTile = ({ title, onSelect, color }) => {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={onSelect}>
      <View style={{ ...styles.container, ...{ backgroundColor: color } }}>
        <TextBold numberOfLines={2} style={styles.title}>
          {title}
        </TextBold>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    textAlign: 'right',
  },
});

export default CategoryGridTile;
