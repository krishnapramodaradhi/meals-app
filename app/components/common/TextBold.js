import { StyleSheet, Text } from 'react-native';

const TextBold = (props) => (
  <Text {...props} style={{ ...styles.text, ...props.style }}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'urbanist-bold',
  },
});

export default TextBold;
