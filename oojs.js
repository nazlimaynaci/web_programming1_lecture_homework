// Base Task class
class Task {
    constructor(title) {
      this.title = title;
      this.completed = false;
    }
  
    toggle() {
      this.completed = !this.completed;
    }
  
    render() {
      const li = document.createElement("li");
      li.textContent = this.title;
      li.style.textDecoration = this.completed ? "line-through" : "none";
  
      // Toggle completion status on click
      li.addEventListener("click", () => {
        this.toggle();
        li.style.textDecoration = this.completed ? "line-through" : "none";
      });
  
      return li;
    }
  }
  
  // Inherited class for special tasks
  class SpecialTask extends Task {
    constructor(title) {
      super(title);
      this.priority = "High";
    }
  
    render() {
      const li = super.render();
      li.style.color = "red";
      li.title = `Priority: ${this.priority}`;
      return li;
    }
  }
  
  // Add new task (normal or special)
  function addNewTask() {
    const input = document.getElementById("task-input");
    const title = input.value.trim();
    if (!title) return;
  
    const task = title.toLowerCase().includes("important")
      ? new SpecialTask(title)
      : new Task(title);
  
    const li = task.render();
    document.getElementById("task-list").appendChild(li);
    input.value = "";
  }