class Task {
  constructor(description, index) {
    this.description = description;
    this.index = index;
    this.id = Math.random()
      .toString(36)
      .substr(2, 5)
      .replace(/[^a-z]/g, "");
    this.completed = false;
  }
}

export default Task;
