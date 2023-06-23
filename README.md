# How to use React Native and MVVM

### Install packages
- npm install -g expo-cli
- npx expo install react-native-mobx mobx mobx-react-lite

### Create app and folder structure 
- npx expo init TaskApp
- cd TaskApp
- mkdir src
- cd src
- mkdir components models viewModels screens

### Work on models
- Create the TaskModel.js file in the models folder
```
class TaskModel {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default TaskModel;
```

### Work on viewModels 
- Create the TaskViewModel.js file in the viewModels folder
```
import { makeAutoObservable } from 'mobx';

class TaskViewModel {
  tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(title, description) {
    const task = { title, description };
    this.tasks.push(task);
  }
}

export default TaskViewModel;
```

### Work on view
- Create the TaskScreen.js file in the screens folder
```
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';

import TaskViewModel from '../viewModels/TaskViewModel';

const taskViewModel = new TaskViewModel();

const TaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    taskViewModel.addTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Task" onPress={handleAddTask} />

      <FlatList
        data={taskViewModel.tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  taskContainer: {
    marginBottom: 10,
  },
});

export default observer(TaskScreen);
```

### Modify App.js
- Replace code with
```
import React from 'react';
import TaskScreen from './src/screens/TaskScreen';

export default function App() {
  return <TaskScreen />;
}
```

### Start the server 
- npx expo start