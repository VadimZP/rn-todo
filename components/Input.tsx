import {
  type StyleProp,
  type ViewStyle,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface InputProps<T> {
  value: string;
  onChangeText: (text: string) => T;
  wrapperStyles?: StyleProp<ViewStyle>;
  placeholder?: string;
  testID?: string;
}

export default function Input<T>({
  value,
  onChangeText,
  wrapperStyles,
  placeholder,
  testID
}: InputProps<T>) {
  return (
    <View style={wrapperStyles}>
      <TextInput
        {...(placeholder != null && placeholder ? { placeholder } : {})}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        testID={testID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#975FA5",
    padding: 12,
    color: "#4B4B4B",
  },
});
