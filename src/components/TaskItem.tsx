import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/trash/pen.png";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  editTask,
  removeTask,
}: TasksListProps) {
  const [isEditing, setisEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setisEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(item.title);
    setisEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, taskTitle);
    setisEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={taskTitle}
            editable={isEditing}
            onChangeText={setTaskTitle}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsWrapper}>
        {isEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 16 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 16 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.viewSeparator} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 16 }}
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewSeparator: {
    width: 1.5,
    height: 24,
    backgroundColor: "#b2b2b275",
  },
});
