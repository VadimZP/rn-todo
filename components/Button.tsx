import {
  type StyleProp,
  type ViewStyle,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

interface Button<T> {
  onPress: () => T;
  title: string;
  height?: number;
  width?: number;
  isDisabled?: boolean;
  pressableStyles?: StyleProp<ViewStyle>;
  testID?: string;
}

export default function Button<T>({
  onPress,
  title,
  width,
  height,
  isDisabled = false,
  pressableStyles,
  testID,
}: Button<T>) {
  const sizeStyles = { width, height };

  return (
    <Pressable
      testID={testID}
      disabled={isDisabled}
      style={[
        styles.button,
        pressableStyles,
        sizeStyles,
        isDisabled ? { backgroundColor: "#9C9C9C" } : {},
      ]}
      onPress={() => {
        onPress();
      }}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    shadowColor: "#9C9C9C",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: "#975FA5",
    borderRadius: 10,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
});
