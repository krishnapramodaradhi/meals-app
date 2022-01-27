import { StyleSheet, Text } from 'react-native';

const TextRegular = (props) => (
  <Text {...props} style={{ ...styles.text, ...props.style }}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'urbanist',
  },
});

export default TextRegular;
