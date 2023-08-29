import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useReducer, useState } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";

import AddTask from "./components/AddTask";
import TaskList, { Task } from "./components/TaskList";

type Action =
  | { type: "added"; id: number; text: string }
  | { type: "changed"; task: Task }
  | { type: "deleted"; id: number };

const initialState: Task[] = [];

function reducer(tasks: Task[], action: Action): Task[] | [] {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      return tasks;
    }
  }
}

export default function App() {
  const [tasks, dispatch] = useReducer(reducer, initialState);

  function handleAddTask(text: string) {
    dispatch({
      type: "added",
      id: tasks.length,
      text: text,
    });
  }

  function handleChangeTask(task: Task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleBiometricAuth = async () => {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        fallbackLabel: "Enter Password",
      });

      setIsAuthenticated(result.success);
    
  };

  useEffect(() => {
    handleBiometricAuth();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paddingsContainer}>
        {isAuthenticated ? (
          <>
            <AddTask onAddTask={handleAddTask} />
            <TaskList
              tasks={tasks}
              onChangeTask={handleChangeTask}
              onDeleteTask={handleDeleteTask}
            />
          </>
        ) : (
          <Text>Access denied</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  paddingsContainer: {
    flex: 1,
    padding: 16,
  },
  inputWrapper: {
    flex: 3,
    marginRight: 16,
  },
});
