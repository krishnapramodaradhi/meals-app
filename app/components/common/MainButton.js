import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import colors from '../../constants/colors';

const MainButton = ({ children, onPress, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.container, ...containerStyle }}>
        <Text style={{ ...styles.text, ...textStyle }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 16,
    color: colors.white,
  },
});

export default MainButton;
