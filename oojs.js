// Base Task class
class Task {
    constructor(title) {
      this.title = title;
      this.completed = false;
    }
  
    renderToTable() {
        const row = document.createElement("tr");
    
        const taskCell = document.createElement("td");
        taskCell.textContent = this.title;
    
        const statusCell = document.createElement("td");
        statusCell.textContent = "Pending";
        statusCell.style.cursor = "pointer";
    
        statusCell.addEventListener("click", () => {
          this.completed = !this.completed;
          statusCell.textContent = this.completed ? "DONE" : "Pending";
          statusCell.style.backgroundColor = this.completed ? "#4CAF50" : "transparent";
          statusCell.style.color = this.completed ? "white" : "black";
        });
    
        row.appendChild(taskCell);
        row.appendChild(statusCell);
        return row;
      }
    }
    
    function addNewTask() {
      const input = document.getElementById("task-input");
      const title = input.value.trim();
      if (!title) return;
    
      const task = new Task(title);
      const row = task.renderToTable();
    
      document.querySelector("#task-table tbody").appendChild(row);
      input.value = "";
    }