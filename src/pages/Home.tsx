import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";
import { confirmAlert, warningAlert } from "../utils/alerts";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const sameTaskFound = tasks.find(
      (item) => item.title.toUpperCase() === newTaskTitle.toUpperCase()
    );

    if (sameTaskFound !== undefined) {
      warningAlert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            done: !task.done,
          }
        : task
    );

    setTasks(newTasks);
  }

  function handleEditTask(id: number, newTitle: string) {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: newTitle,
          }
        : task
    );

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={(id) =>
          confirmAlert(
            "Remover item",
            "Tem certeza que você deseja remover esse item?",
            id,
            handleRemoveTask
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
