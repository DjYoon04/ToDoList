<template>
  <v-app>
    <v-container class="pa-5 custom-container mt-5">
      <div class="fluid-container">
        <!-- Title -->
        <v-row justify="center" class="mb-5">
          <v-col cols="12" class="text-center">
            <h2>TO-DO LIST</h2>
          </v-col>
        </v-row>

        <!-- Input and Submit Button -->
        <v-row justify="center" class="mb-4">
          <v-col xs="12" sm="8">
            <v-text-field
              v-model="newTask"
              label="Add Task"
              outlined
              dense
              clearable
              class="custom-text-field"
            ></v-text-field>
          </v-col>
          <v-col xs="12" sm="4">
            <v-btn @click="addTask" color="primary" block class="custom-btn">
              SUBMIT
            </v-btn>
          </v-col>
        </v-row>

        <!-- No Tasks Message -->
        <v-row justify="center" v-if="tasks.length === 0">
          <v-col cols="12" class="text-center">
            <p>NO TASKS</p>
          </v-col>
        </v-row>

        <!-- Task List -->
        <v-row justify="center" v-else v-for="task in tasks" :key="task.id">
          <v-col cols="12">
            <v-card outlined class="d-flex align-center justify-space-between custom-card mt-5">
              <v-card-title :class="{ 'line-through': task.completed }">{{ task.name }}</v-card-title>
              <v-card-actions>
                <v-checkbox class="mt-5" v-model="task.completed"></v-checkbox>
                <v-btn icon class="border bg-warning" color="white" @click="openEditModal(task)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon class="border bg-red me-3" color="white" @click="deleteTask(task.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Control Buttons -->
        <v-row justify="center" class="mt-4">
          <v-col xs="12" sm="6" md="4">
            <v-btn color="blue" block @click="checkAllTasks" class="custom-btn">Check All Tasks</v-btn>
          </v-col>
          <v-col xs="12" sm="6" md="4">
            <v-btn color="red" block @click="deleteCompletedTasks" class="custom-btn">Delete Completed Tasks</v-btn>
          </v-col>
        </v-row>

        <!-- Edit Task Modal -->
        <v-dialog v-model="isModalOpen" max-width="500px">
          <v-card>
            <v-card-title>Edit Task</v-card-title>
            <v-card-subtitle>
              <v-text-field
                v-model="editedTask.name"
                label="Task Name"
                outlined
                dense
                :disabled="!editedTask"
              ></v-text-field>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="saveTask" color="primary" :disabled="!editedTask">Save</v-btn>
              <v-btn @click="closeModal" color="grey">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: JSON.parse(localStorage.getItem("tasks")) || [], // Load tasks from localStorage or start with an empty array
      isModalOpen: false,
      editedTask: { id: null, name: "" }, // Initialize as empty object
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        const newId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
        this.tasks.push({ id: newId, name: this.newTask, completed: false });
        this.newTask = "";
        this.saveTasksToLocalStorage();
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasksToLocalStorage();
    },
    openEditModal(task) {
      this.editedTask = { ...task }; // Copy task data for editing
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.editedTask = { id: null, name: "" }; // Reset editedTask
    },
    saveTask() {
      if (this.editedTask.id !== null) {
        const index = this.tasks.findIndex(task => task.id === this.editedTask.id);
        if (index !== -1) {
          this.tasks[index] = { ...this.editedTask }; // Update task
          this.closeModal();
          this.saveTasksToLocalStorage();
        }
      }
    },
    checkAllTasks() {
      this.tasks.forEach(task => {
        task.completed = true;
      });
      this.saveTasksToLocalStorage();
    },
    deleteCompletedTasks() {
      this.tasks = this.tasks.filter(task => !task.completed); // Remove completed tasks
      this.saveTasksToLocalStorage();
    },
    saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks)); // Save tasks to localStorage
    },
  },
};
</script>

<style scoped>
.custom-container {
  background-color: #f3e8ff;
  border-radius: 20px;
  padding: 1rem; /* Reduced padding */
  max-width: 1000px; /* Smaller max-width */
  margin: 0 auto; /* Center the container */
}

.fluid-container {
  max-width: 100%;
  background-color: inherit;
}

.custom-text-field .v-input__control {
  border-radius: 15px;
}

.custom-btn {
  border-radius: 15px;
}

.custom-card {
  background-color: #b6b9d3;
  border-radius: 20px;
}

.line-through {
  text-decoration: line-through;
}

@media (max-width: 600px) {
  .custom-container {
    padding: 0.5rem; /* Further reduce padding on smaller screens */
    max-width: 100%; /* Ensure it takes full width on smaller screens */
  }
}
</style>
