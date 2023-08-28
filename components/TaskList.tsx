import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";

import Button from "./Button";
import Input from "./Input";

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onChangeTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => {
        return (
          <Task task={item} onChange={onChangeTask} onDelete={onDeleteTask} />
        );
      }}
      keyExtractor={(item) => `${item.id}`}
    />
  );
}

interface TaskProps {
  task: Task;
  onChange: (task: Task) => void;
  onDelete: (id: number) => void;
}

function Task({ task, onChange, onDelete }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <Input
          wrapperStyles={styles.inputWrapperStyles}
          value={task.text}
          onChangeText={(value) => {
            onChange({
              ...task,
              text: value,
            });
          }}
          testID={`task-input-${task.id}`}
        />
        <Button
          title="Save"
          onPress={() => setIsEditing(false)}
          width={80}
          height={40}
          pressableStyles={styles.pressableStyles}
          testID={`save-btn-${task.id}`}
        />
      </>
    );
  } else {
    taskContent = (
      <>
        <Text style={styles.taskTextStyle}>{task.text}</Text>
        <Button
          title="Edit"
          onPress={() => setIsEditing(true)}
          width={80}
          height={40}
          pressableStyles={styles.pressableStyles}
          testID={`edit-btn-${task.id}`}
        />
      </>
    );
  }
  return (
    <View style={styles.container} testID={`task-item-${task.id}`}>
      <Checkbox
        style={styles.checkbox}
        value={task.done}
        onValueChange={(value) => {
          onChange({
            ...task,
            done: value,
          });
        }}
      />
      {taskContent}
      <Button
        title="Delete"
        onPress={() => onDelete(task.id)}
        width={80}
        height={40}
        testID={`delete-btn-${task.id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputWrapperStyles: {
    flex: 1,
    marginRight: 10,
  },
  pressableStyles: {
    marginRight: 10,
  },
  taskTextStyle: {
    flex: 1,
    marginRight: 10,
  },
  checkbox: {
    marginRight: 12,
  },
});
