import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "./Button";
import Input from "./Input";

interface AddTaskProps {
  onAddTask: (value: string) => void;
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Input
        placeholder="Add task..."
        value={text}
        onChangeText={(value) => {
          if (value === " ") {
            setText(value.trim());
          } else {
            setText(value);
          }
        }}
        wrapperStyles={styles.inputWrapper}
      />
      <Button
        title="Add"
        width={80}
        isDisabled={!text.length}
        onPress={() => {
          onAddTask(text);
          setText("");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  inputWrapper: {
    flex: 3,
    marginRight: 16,
  },
});
