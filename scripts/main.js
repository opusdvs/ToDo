'user strict';

// Main JavaScript file for the Todo application

const openFormButton = document.querySelector('.open-form');
const addTaskButton = document.querySelector('.add-task');
const formTitleInput = document.getElementById('task-title');
const formDeadlineInput = document.getElementById('task-deadline');
const formDescriptionInput = document.getElementById('task-description');
const taskFormContainer = document.querySelector('.task-form-container');
const closeFormButton = document.querySelector('.close-form');
const taskList = document.querySelector('.task-list');
const taskListItems = document.querySelector('.task-list-items');
const deleteTaskButton = document.querySelector('task-delete');
const tasks = [];
let html = '';

closeFormButton.addEventListener('click', () => {
   taskFormContainer.style.display = 'none';
});

openFormButton.addEventListener('click', () => {
   taskFormContainer.style.display = 'flex';
});

document.addEventListener("keydown", (event) => {
   if (event.key == 'Escape') {
      taskFormContainer.style.display = 'none';
   }
});

document.addEventListener("click", (event) => {
   if (event.target == taskFormContainer) {
      taskFormContainer.style.display = 'none';
   }
})



addTaskButton.addEventListener('click', (event) => {
   event.preventDefault();
   tasks.push({
      taskId: (() => {
         return crypto.randomUUID()
      })(),
      taskTitle: formTitleInput.value,
      taskDeadline: formDeadlineInput.value,
      taskDescription: formDescriptionInput.value,
      taskStatus: "Pendiing"
   });
   
   (function closeAddTaskForm() {
      taskFormContainer.style.display = 'none';
   })();
   
   (function clearTaskForm() {
      formTitleInput.value = '';
      formDeadlineInput.value = '';
      formDescriptionInput.value = '';
   })();
   
   renderTask();
});



function renderTask() {
   tasks.forEach((task, index) => {
      html += `
         <div class="task-item">
            <span>Задача ${index + 1}: ${task.taskTitle}</span>
            <span>Срок: ${task.taskDeadline}</span>
            <select class="task-status" id="${task.taskId}">
               <option value="pending">Pending</option>
               <option value="in-progress">In Progress</option>
               <option value="completed">Completed</option>
            </select>
            <button class="task-details" id="${task.taskId}" onClick="">Подробнее</button>
            <button class="task-delete" id="${task.taskId}" onClick="deleteTask(this)">Удалить задачу</button>
         </div>
      `
   })
   taskListItems.innerHTML = html;
   html = '';
}

function deleteTask(e) {
   tasks.forEach((task, index) => {
      if (task.taskId == e.id) {
         tasks.splice(index, 1);
      }
   })

   renderTask();
}

function detailTask() {
   
}