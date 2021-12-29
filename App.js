import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (enteredGoal) => {
    setGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: enteredGoal },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
  };

  const cancelGoalInput = () => {
    setIsAddMode(false);
  };
  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        addGoalHandler={addGoalHandler}
        isVisible={isAddMode}
        cancel={cancelGoalInput}
      />
      <FlatList
        data={goals}
        renderItem={(itemData) => (
          <GoalItem
            title={itemData.item.value}
            id={itemData.item.id}
            removeGoalHandler={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
