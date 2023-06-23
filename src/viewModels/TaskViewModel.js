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
