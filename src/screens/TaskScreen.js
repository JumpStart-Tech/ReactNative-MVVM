import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
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
    <View>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Task" onPress={handleAddTask} />

      <FlatList
        data={taskViewModel.tasks}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default observer(TaskScreen);
